import { ITransaction } from '@src/@types/transaction';
import { Header } from '@src/components/default';
import { useTransactions } from '@src/hooks/useTransactions';
import {
  TTransactionByDate,
  filterTransactionsByMonth,
  groupTransactionsByDay,
} from '@src/utils/transactions';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { View } from 'react-native';
import { MonthSelect } from './sections/list/MonthSelect';
import { MonthSummary } from './sections/list/MonthSummary';
import { MonthTransactions } from './sections/list/MonthTransactions';

// ----------------------------------------------------------------------

export function TransactionList() {
  const { rawTransactions } = useTransactions();

  const [selectedMonth, setSelectedMonth] = useState<Date>(new Date());

  // ----------------------------------------------------------------------

  const [transactions, setTransactions] = useState<{
    byMonth: ITransaction[];
    byMonthGroupedByDay: TTransactionByDate[];
  }>({ byMonth: [], byMonthGroupedByDay: [] });

  const handleTransactionsChange = () => {
    const filtered = filterTransactionsByMonth(rawTransactions, selectedMonth);
    const grouped = groupTransactionsByDay(filtered);

    setTransactions({
      byMonth: filtered,
      byMonthGroupedByDay: grouped,
    });
  };

  useEffect(() => {
    handleTransactionsChange();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rawTransactions, selectedMonth]);

  // ----------------------------------------------------------------------

  return (
    <View style={{ flex: 1 }}>
      <Header onPressBack={() => router.navigate('/home')} title="Transações" />

      <MonthSelect
        selectedMonth={selectedMonth}
        onChangeMonth={setSelectedMonth}
      />

      <MonthSummary transactions={transactions.byMonth} />

      <MonthTransactions transactions={transactions.byMonthGroupedByDay} />
    </View>
  );
}
