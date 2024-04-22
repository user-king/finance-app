import React, { useState, useEffect } from 'react';
import { View, Text, Alert, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { addTransaction, loadTransaction } from '../store/actions';
import DateTimePicker from '@react-native-community/datetimepicker';
import { TextInput, Button, Switch, Card, DataTable } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BarChart } from 'react-native-chart-kit';


const TransactionsPage = () => {
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(null);
  const [isIncome, setIsIncome] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);

  const dispatch = useDispatch();
  const transactions = useSelector(state => state.transactions);

  const chartData = {
    labels: transactions.map(transaction => transaction.date),
    datasets: [
      {
        data: transactions.map(transaction => transaction.amount),
        color: (opacity = 1) => `rgba(0, 128, 0, ${opacity})`,
      },
      {
        data: transactions.map(transaction => -transaction.amount),
        color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`,
      },
    ],
  };

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
    const income = transactions?.filter(transaction => transaction?.type === 'income').reduce((total, transaction) => total + transaction.amount, 0);
    const expenses = transactions?.filter(transaction => transaction?.type === 'expense').reduce((total, transaction) => total + transaction.amount, 0);
    setTotalIncome(income);
    setTotalExpenses(expenses);
  }, [transactions]);

  const handleAddTransaction = async () => {
    if (!category || !amount || !date) {
      Alert.alert('Error', 'Please fill out all fields.');
      return;
    }
    const newTransaction = {
      category,
      amount: parseFloat(amount),
      date: date.toISOString().split('T')[0],
      type: isIncome ? 'income' : 'expense',
    };
    dispatch(addTransaction(newTransaction));
    try {
      await AsyncStorage.setItem('transactions', JSON.stringify([...transactions, newTransaction]));
    } catch (error) {
      console.error('Error saving transaction:', error);
    }
    Alert.alert('Success', 'Transaction added successfully');
    setCategory('');
    setAmount('');
    setDate(null);
    setIsIncome(false);
  };

  return (
    <>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={{ padding: 20 }}>
          <Text style={{ fontSize: 24, marginBottom: 10 }}>Transactions</Text>
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
                <DateTimePicker
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

          {/* Bar Chart */}
          <BarChart
            style={styles.chart}
            data={chartData}
            width={Dimensions.get('window').width - 20}
            height={200}
            yAxisLabel="$"
            yAxisSuffix=""
            chartConfig={chartConfig}
            verticalLabelRotation={30}
          />

          <Card style={{ marginBottom: 20 }}>
            <Card.Content>
              <DataTable>
                <DataTable.Header>
                  <DataTable.Title>Category</DataTable.Title>
                  <DataTable.Title numeric>Amount </DataTable.Title>
                  <DataTable.Title>Date</DataTable.Title>
                </DataTable.Header>

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

          <Text>Total Income: ${totalIncome}</Text>
          <Text>Total Expenses: ${totalExpenses}</Text>
          <Text>Total Balance: ${totalIncome - totalExpenses}</Text>
        </View>
      </ScrollView>
    </>
  );
};

export default TransactionsPage;

const chartConfig = {
  backgroundGradientFrom: '#fff',
  backgroundGradientTo: '#fff',
  decimalPlaces: 0,
  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
};

const styles = StyleSheet.create({
  chart: {
    marginBottom: 20,
  },
})