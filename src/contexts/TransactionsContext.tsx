import { ITransaction } from '@src/@types/transaction';
import { dbMethods } from '@src/utils/firebase/database';
import React, { createContext, ReactNode, useEffect, useState } from 'react';

// ----------------------------------------------------------------------

interface TransactionsContextProps {
  rawTransactions: ITransaction[];
}

// ----------------------------------------------------------------------

interface Props {
  children: ReactNode;
}

//

export function TransactionsProvider({ children }: Props) {
  const [rawTransactions, setRawTransactions] = useState<
    TransactionsContextProps['rawTransactions']
  >([]);

  useEffect(() => {
    const subscribe = dbMethods().transaction.index((data) => {
      setRawTransactions(data);
    });

    return () => subscribe();
  }, []);

  return (
    <TransactionsContext.Provider
      value={{
        rawTransactions,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  );
}

// ----------------------------------------------------------------------

export const TransactionsContext = createContext<TransactionsContextProps>(
  {} as TransactionsContextProps,
);
