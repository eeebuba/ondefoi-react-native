import { TransactionsContext } from '@src/contexts/TransactionsContext';
import { useContext } from 'react';

// ----------------------------------------------------------------------

export function useTransactions() {
  return useContext(TransactionsContext);
}
