import React, { useLayoutEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import { auth } from '../firebase/firebase';  // Firebase import
import { createUserWithEmailAndPassword } from 'firebase/auth'; // Firebase auth import
import { doc, setDoc } from 'firebase/firestore'; // Firestore for additional user data
import { firestore } from '../firebase/firebase';

// Define the navigation prop type for the Register screen
type RegisterScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Register'>;

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState<'doctor' | 'patient'>('patient');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const navigation = useNavigation<RegisterScreenNavigationProp>();

  // Set header options
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'Health Solutions',
      headerTitleAlign: 'center',
      headerStyle: {
        backgroundColor: '#121212',  // Dark header background
      },
      headerTintColor: '#fff', // White header text
    });
  }, [navigation]);

  // Handle registration
  const handleRegister = async () => {
    setError(''); // Clear previous errors

    // Validate email and password
    if (!email || !password) {
      setError('Please fill in both email and password');
      return;
    }

    setLoading(true);

    try {
      // Register user using Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Save additional user information in Firestore
      await setDoc(doc(firestore, 'users', user.uid), {
        userType,
        email: user.email,
      });

      // After successful registration, navigate based on userType
      if (userType === 'doctor') {
        navigation.navigate('DoctorDashboard');
      } else {
        navigation.navigate('PatientDashboard');
      }

    } catch (err: any) {
      // Handle Firebase error
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header with App Name */}
      <Text style={styles.header}>Create an Account!</Text>

      {/* Email Input */}
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="Enter your email"
        keyboardType="email-address"
        style={styles.input}
      />

      {/* Password Input */}
      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder="Enter your password"
        secureTextEntry
        style={styles.input}
      />

      {/* User Type Radio Buttons */}
      <View style={styles.radioContainer}>
        <Text style={styles.label}>Register as:</Text>
        <View style={styles.radioButton}>
          <TouchableOpacity onPress={() => setUserType('doctor')} style={[styles.radioOption, userType === 'doctor' && styles.radioSelected]}>
            <Text style={styles.radioText}>Doctor</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setUserType('patient')} style={[styles.radioOption, userType === 'patient' && styles.radioSelected]}>
            <Text style={styles.radioText}>Patient</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Error Message */}
      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      {/* Register Button */}
      <TouchableOpacity style={styles.button} onPress={handleRegister} disabled={loading}>
        {loading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Register</Text>
        )}
      </TouchableOpacity>

      {/* Sign In Link */}
      <View style={styles.signInLink}>
        <Text style={styles.signInText}>Already have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.linkText}>Sign In</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#FFFFFF', // Dark background color
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000000', // White text color
    marginBottom: 30,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: '#2C2C2C', // Darker input background
    borderColor: '#444444', // Dark grey border for input
    color: '#FFFFFF', // White text color in input
  },
  radioContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: '#B0B0B0', // Light grey for label
    marginBottom: 5,
  },
  radioButton: {
    flexDirection: 'column', // Arrange buttons vertically
    alignItems: 'flex-start', // Align buttons to the left
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#444444', // Dark grey border for radio options
    marginBottom: 10, // Space between radio buttons
  },
  radioSelected: {
    backgroundColor: '#006D77', // Blue background when selected
    borderColor: '#006D77', // Blue border when selected
  },
  radioText: {
    fontSize: 16,
    color: '#00000', // White text for radio options
    marginLeft: 10,
  },
  errorText: {
    color: '#E74C3C', // Red for error message
    marginBottom: 15,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#006D77', // 
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonText: {
    fontSize: 18,
    color: '#FFFFFF', // White text on the button
    fontWeight: 'bold',
  },
  signInLink: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  signInText: {
    fontSize: 16,
    color: '#B0B0B0', // Light grey text for "Already have an account?"
  },
  linkText: {
    fontSize: 16,
    color: '#3498db', // Blue text for "Sign In"
    marginLeft: 5,
  },
});

export default Register;
