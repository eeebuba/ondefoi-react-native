import { ITransaction } from '@src/@types/transaction';
import { fDateWritten } from '@src/utils/date';
import { addMonths, addYears, endOfYear, format } from 'date-fns';
import { pt } from 'date-fns/locale';

// ----------------------------------------------------------------------

type TTransactionByDate = {
  date: string;
  label: string;
  transactions: ITransaction[];
};

/** used on month selector */
type TMonthRef = {
  id: string;
  label: string;
  refDate: Date;
};

// ----------------------------------------------------------------------

const getMonthDifference = (start: Date, end: Date) => {
  return (
    end.getMonth() -
    start.getMonth() +
    12 * (end.getFullYear() - start.getFullYear())
  );
};

const isSameMonth = (dateLeft: Date, dateRight: Date): boolean => {
  const sameYear = dateLeft.getFullYear() === dateRight.getFullYear();
  const sameMonth = dateLeft.getMonth() === dateRight.getMonth();
  return sameYear && sameMonth;
};

/** used to fill month selector */
const createMonthList = () => {
  const start = new Date('2022-01-01');
  const end = endOfYear(addYears(new Date(), 1));
  const difference = getMonthDifference(start, end);
  return Array.from(Array(difference + 1)).map((_, i) => {
    const refDate = addMonths(start, i);
    let label = `${format(refDate, 'MMM yy', { locale: pt })}`;
    label = label.charAt(0).toUpperCase() + label.slice(1);
    return {
      id: label,
      label: label,
      refDate: refDate,
    } as TMonthRef;
  });
};

// ----------------------------------------------------------------------

const groupTransactionsByDay = (transactions: ITransaction[]) => {
  // group by date
  const groups = transactions.reduce(
    (groups, transaction) => {
      const date = transaction.occurred_at.toISOString().split('T')[0];
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(transaction);
      return groups;
    },
    {} as { [key: string]: ITransaction[] },
  );
  // normalize
  const groupArrays = Object.keys(groups).map((date) => {
    return {
      date,
      label: fDateWritten(date + 'T03:00:00.000Z'),
      transactions: groups[date],
    };
  });
  // sort
  groupArrays.sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
  return groupArrays;
};

const filterTransactionsByMonth = (
  transactions: ITransaction[] | undefined,
  date: Date,
): ITransaction[] => {
  return (
    transactions?.filter((transaction) =>
      isSameMonth(new Date(transaction.occurred_at), date),
    ) || []
  );
};

// ----------------------------------------------------------------------

export {
  createMonthList,
  filterTransactionsByMonth,
  groupTransactionsByDay,
  isSameMonth,
  TMonthRef,
  TTransactionByDate,
};
