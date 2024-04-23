// Import action types
import { ADD_TRANSACTION, LOAD_TRANSACTIONS } from './types';

// Initial state for the transaction reducer
const initialState = {
  transactions: [],  // Array to hold transaction data
};

// Reducer function for managing transaction state
const transactionReducer = (state = initialState, action) => {
  switch (action.type) {
    // Case for adding a new transaction
    case ADD_TRANSACTION:
      return {
        ...state,
        transactions: [...state.transactions, action.payload], // Add new transaction to the array
      };
    // Case for loading transactions
    case LOAD_TRANSACTIONS:
      return {
        ...state,
        transactions: action.payload, // Replace transactions with the loaded data
      };
  
    // Default case returns current state
    default:
      return state;
  }
};

// Export the transaction reducer
export default transactionReducer; 
