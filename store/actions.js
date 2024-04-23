// Import action types
import { ADD_TRANSACTION, LOAD_TRANSACTIONS } from './types';

// Action creator function to add a new transaction
export const addTransaction = transaction => ({
  type: ADD_TRANSACTION, // Action type to add transaction
  payload: transaction,  // Transaction data to be added
});

// Action creator function to load transaction
export const loadTransaction = transaction => ({
  type: LOAD_TRANSACTIONS, // Action type to load transactions
  payload: transaction,  // Transaction data to be loaded
});
