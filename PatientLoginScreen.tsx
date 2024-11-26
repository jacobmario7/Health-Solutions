import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebaseConfig';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
  Home: undefined;
  Register: undefined;
  PatientDashboard:undefined;
};

type PatientLoginScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

interface PatientLoginScreenProps {
  navigation: PatientLoginScreenNavigationProp;
}

const PatientLoginScreen: React.FC<PatientLoginScreenProps> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    if (email === '' || password === '') {
      setError('Please enter both email and password');
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      setError(null); 
      navigation.navigate('PatientDashboard');
    } catch (error: any) {
      switch (error.code) {
        case 'auth/user-not-found':
          setError('User not found. Please register first.');
          break;
        case 'auth/wrong-password':
          setError('Incorrect password. Please try again.');
          break;
        case 'auth/invalid-email':
          setError('Invalid email format');
          break;
        default:
          setError('An unexpected error occurred. Please try again.');
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Patient Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#495579"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#495579"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}

      <Button title="Login" color="#495579" onPress={handleLogin} />

      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={styles.signUpText}>Don't have an account? Register</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#263159',
  },
  title: {
    fontSize: 24,
    color: '#FFFBEB',
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  input: {
    height: 50,
    borderColor: '#495579',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 10,
    paddingHorizontal: 10,
    color: '#FFFBEB',
  },
  errorText: {
    color: '#FFFBEB',
    marginBottom: 15,
    textAlign: 'center',
    backgroundColor: '#495579',
    padding: 10,
    borderRadius: 5,
  },
  signUpText: {
    color: '#FFFBEB',
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    textDecorationLine: 'underline',
  },
});

export default PatientLoginScreen;
