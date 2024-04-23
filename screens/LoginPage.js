import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { TextInput, Snackbar } from 'react-native-paper';

// Component for the login page
const LoginPage = ({ navigation }) => {

  // State variables to manage username and password inputs
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('password');
  const [snackbarVisible, setSnackbarVisible] = useState(false);

  // Function to handle login button press
  const handleLogin = () => {
    if (username === 'admin' && password === 'password') {
      navigation.navigate('Transactions');
    } else {
      setSnackbarVisible(true); // Show error message if credentials are incorrect
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        {/* Username input field */}
        <TextInput
          placeholder="Username"
          value={username}
          onChangeText={text => setUsername(text)}
          style={styles.input}
        />
         {/* Password input field */}
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={text => setPassword(text)}
          secureTextEntry // Hide input text
          style={styles.input}
        />
          {/* Login button */}
        <TouchableOpacity onPress={handleLogin} style={styles.button}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>
      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        action={{
          label: 'Close',
          onPress: () => setSnackbarVisible(false),
        }}
      >
        Invalid username or password
      </Snackbar>
    </View>
  );
};

export default LoginPage;


// styles for screen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'#fae4a7'
  },
  form: {
    width: '80%',
  },
  input: {
    marginBottom: 15,
    backgroundColor: '#f2f2f2',
    borderRadius: 5,
  },
  button: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
});
