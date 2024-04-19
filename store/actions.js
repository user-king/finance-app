import { ADD_TRANSACTION, LOAD_TRANSACTIONS } from './types';

export const addTransaction = transaction => ({
  type: ADD_TRANSACTION,
  payload: transaction,
});

export const loadTransaction = transaction => ({
  type: LOAD_TRANSACTIONS,
  payload: transaction,
});
