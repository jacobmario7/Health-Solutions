import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebaseConfig';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  PatientLogin:undefined;
};

type PatientRegisterScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

interface PatientRegisterScreenProps {
  navigation: PatientRegisterScreenNavigationProp;
}

const PatientRegisterScreen: React.FC<PatientRegisterScreenProps> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleRegister = async () => {
    if (email === '' || password === '') {
      setError('Please enter both email and password');
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setError(null); 
      navigation.navigate('PatientLogin');
    } catch (error: any) {
      switch (error.code) {
        case 'auth/email-already-in-use':
          setError('This email is already in use');
          break;
        case 'auth/invalid-email':
          setError('Invalid email format');
          break;
        case 'auth/weak-password':
          setError('Password is too weak (minimum 6 characters)');
          break;
        default:
          setError('An unexpected error occurred. Please try again.');
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Patient Registration</Text>
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

      <Button title="Sign Up" color="#495579" onPress={handleRegister} />

      <TouchableOpacity onPress={() => navigation.navigate('PatientLogin')}>
        <Text style={styles.signInText}>Already a user? Sign in</Text>
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
  signInText: {
    color: '#FFFBEB',
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    textDecorationLine: 'underline',
  },
});

export default PatientRegisterScreen;
