import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, ActivityIndicator } from 'react-native';
import { loginUser } from '../services/authService';  // Import loginUser function

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    setLoading(true);
    setError(''); // Reset error message

    if (!email || !password) {
      setError('Please fill in both email and password');
      setLoading(false);
      return;
    }

    try {
      const result = await loginUser(email, password);

      if (result.success) {
        // Navigate to the appropriate dashboard
        // navigation.navigate('UserDashboard');
      } else {
        setError(result.message);
      }
    } catch (error) {
      setError('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Email:</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="Enter your email"
        style={{ borderWidth: 1, marginBottom: 10, padding: 10 }}
      />
      <Text>Password:</Text>
      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder="Enter your password"
        secureTextEntry
        style={{ borderWidth: 1, marginBottom: 10, padding: 10 }}
      />

      {error ? <Text style={{ color: 'red' }}>{error}</Text> : null}

      <Button title="Login" onPress={handleLogin} />
      {loading && <ActivityIndicator size="large" />}
    </View>
  );
};

export default Login;
