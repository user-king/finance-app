/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

// Main component to manage navigation and provide Redux store

import React from 'react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginPage from './screens/LoginPage';
import TransactionsPage from './screens/TransactionsPage';
import store from './store/store';

const Stack = createStackNavigator();

function App() {

  return (
    <Provider store={store}>  {/* Wrap the app with Redux Provider */}
      <NavigationContainer>  {/* Wrap the app with React Navigation Container */}
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{
            headerTitleAlign: 'center', 
            headerStyle: {
              backgroundColor: '#fff',
            },
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}>          {/* Define stack navigator with login and transactions screens */}
          <Stack.Screen
            name="Login"
            component={LoginPage}
            options={{
              title: 'Login',
            }} />           {/* Login screen */}

          <Stack.Screen
            name="Transactions"
            component={TransactionsPage}
            options={{
              title: 'Transactions',
            }}
          />          {/* Transactions screen */}

        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
