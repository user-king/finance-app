import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';

const LoginPage = ({ navigation }) => {
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('password');

  const handleLogin = () => {
    if (username === 'admin' && password === 'password') {
      navigation.navigate('Transactions');
    } else {
      Alert.alert('Error', 'Invalid username or password');
    }
  };

  return (
    <View>
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={text => setUsername(text)}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={text => setPassword(text)}
        secureTextEntry
      />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};

export default LoginPage;
