# finance-app
Finance Tracker App
Welcome to the Finance Tracker App README! This document will guide you through setting up the project, understanding its functionalities, and provide notes on using Redux and Material UI.

Project Setup
Prerequisites
Node.js and npm/yarn installed on your machine
Android Studio or Xcode set up for React Native development
Installation
Clone the repository:

bash
Copy code
git clone https://github.com/user-king/finance-app.git
Navigate to the project directory:

bash
Copy code
cd finance-tracker-app
Install dependencies:

bash
Copy code
npm install
# or
yarn
Link native dependencies for Material UI (if required):
Follow the instructions provided by the Material UI for React Native documentation for linking native dependencies.

Running the App
For iOS:

bash
Copy code
npx react-native run-ios
For Android:

bash
Copy code
npx react-native run-android

Functionalities
Add Transactions: Users can add income and expense transactions with categories, amounts, and dates.
View Transactions: Transactions are displayed in a list, categorized for easy viewing.
Calculate Balance: Total balance is calculated by subtracting total expenses from total income.
Optional: Charts: Basic charts visualize income and expense trends.
Manage Categories: Users can add new transaction categories.
Using Redux
Redux is used for global state management in the Finance Tracker App. Actions, reducers, and a Redux store are implemented to manage transactions, categories, and balance.

Actions
addTransaction: Adds a new transaction to the store.
addCategory: Adds a new category to the store.
Reducers
transactionsReducer: Manages transactions state.
categoriesReducer: Manages categories state.
Using Material UI
Material UI components are used for styling the Finance Tracker App, providing a visually appealing and user-friendly interface. Components such as TextFields, Buttons, Cards, and Tables are utilized for consistent design.

Additional Notes
Ensure that you have set up a proper environment for React Native development, including Node.js, npm/yarn, and required SDKs.
Material UI for React Native requires linking native dependencies. Follow the documentation for proper setup instructions.
Feel free to customize the application according to your needs and preferences!
