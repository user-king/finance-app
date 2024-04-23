// Component for the transactions page
import React, { useState, useEffect } from 'react';
import { View, Text, Alert, StyleSheet, ScrollView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { addTransaction, loadTransaction } from '../store/actions';
import DateTimePicker from '@react-native-community/datetimepicker';
import { TextInput, Button, Switch, Card, DataTable } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';


const TransactionsPage = () => {
  // State variables for managing transaction data and form inputs
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(null);
  const [isIncome, setIsIncome] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);

  const dispatch = useDispatch();
  const transactions = useSelector(state => state.transactions);
  
  useEffect(() => {
    const loadTransactions = async () => {
      try {
        const savedTransactions = await AsyncStorage.getItem('transactions');
        if (savedTransactions !== null) {
          dispatch(loadTransaction(JSON.parse(savedTransactions)));
        }
      } catch (error) {
        console.error('Error loading transactions:', error);
      }
    };

    loadTransactions();
  }, []);
  

  useEffect(() => {
    // Function to calculate income and expense
    const income = transactions?.filter(transaction => transaction?.type === 'income').reduce((total, transaction) => total + transaction.amount, 0);
    const expenses = transactions?.filter(transaction => transaction?.type === 'expense').reduce((total, transaction) => total + transaction.amount, 0);
    setTotalIncome(income);
    setTotalExpenses(expenses);
  }, [transactions]);

  // Function to handle adding a new transaction
  const handleAddTransaction = async () => {
    if (!category || !amount || !date) {
      // Show an alert if any field is empty
      Alert.alert('Error', 'Please fill out all fields.');
      return;
    }
    const newTransaction = {
      category,
      amount: parseFloat(amount),
      date: date.toISOString().split('T')[0],
      type: isIncome ? 'income' : 'expense',
    };
    dispatch(addTransaction(newTransaction)); // Dispatch action to add transaction
    try {
      // Save transactions to AsyncStorage
      await AsyncStorage.setItem('transactions', JSON.stringify([...transactions, newTransaction]));
    } catch (error) {
      console.error('Error saving transaction:', error);
    }
    // Show success message
    Alert.alert('Success', 'Transaction added successfully');
    // Clear form inputs
    setCategory('');
    setAmount('');
    setDate(null);
    setIsIncome(false);
  };

  return (
    <>
     <ScrollView contentContainerStyle={{ flexGrow: 1 }}>  {/* ScrollView to enable scrolling */}
      <View style={{ padding: 20 }}>     {/* Main content container */}
        <Text style={{ fontSize: 24, marginBottom: 10 }}>Transactions</Text>  {/* Add Transaction Card */}
        <Card style={{ marginBottom: 20 }}>
          <Card.Content>
            <TextInput
              label="Category"
              value={category}
              onChangeText={text => setCategory(text)}
            />
            <TextInput
              label="Amount"
              value={amount}
              onChangeText={text => setAmount(text)}
              keyboardType="numeric"
            />
            {!date && (
              <Button onPress={() => setShowDatePicker(true)}>Select Date</Button>
            )}
            {date && (
              <Text>{date.toISOString().split('T')[0]}</Text>
            )}

            {showDatePicker && (
              <DateTimePicker   // Date Time picker for adding date
                value={date || new Date()}
                mode="date"
                display="default"
                onChange={(event, selectedDate) => {
                  setShowDatePicker(false);
                  setDate(selectedDate || date)
                }
                }
              />
            )}
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
              <Switch
                value={isIncome}
                onValueChange={setIsIncome}
                style={{ marginRight: 10 }}
              />
              <Text>{isIncome ? 'Income' : 'Expense'}</Text>
            </View>
          </Card.Content>
          <Card.Actions>
            <Button onPress={handleAddTransaction}>{isIncome ? 'Income' : 'Add Transaction'}</Button>
          </Card.Actions>
        </Card>

        <Card style={{ marginBottom: 20 }}>   {/* Transaction Table */}
          <Card.Content>
            <DataTable> {/* Display transaction header in row table */}
              <DataTable.Header>
                <DataTable.Title>Category</DataTable.Title>
                <DataTable.Title numeric>Amount </DataTable.Title>
                <DataTable.Title>Date</DataTable.Title>
              </DataTable.Header>

              {/* Display each transaction as a row in the table */}
              {transactions?.map((transaction, index) => (
                <DataTable.Row key={index}>
                  <DataTable.Cell>{transaction?.category}</DataTable.Cell>
                  <DataTable.Cell numeric>${transaction?.amount}  </DataTable.Cell>
                  <DataTable.Cell>{transaction?.date}</DataTable.Cell>
                </DataTable.Row>
              ))}
            </DataTable>
          </Card.Content>
        </Card>

        {/* Total Summary */}
        <Text>Total Income: ${totalIncome}</Text>
        <Text>Total Expenses: ${totalExpenses}</Text>
        <Text>Total Balance: ${totalIncome - totalExpenses}</Text>
      </View>
      </ScrollView>
    </>
  );
};

export default TransactionsPage;
