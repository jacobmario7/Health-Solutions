import 'react-native-gesture-handler'; // Add this line
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './Login';
import Register from './Register';
import DoctorDashboard from './DoctorDashboard';
import PatientDashboard from './PatientDashboard';
import PrescriptionUpload from './PrescriptionUpload';
import MedicationReminder from './MedicationReminder';
import { RootStackParamList } from '../types/navigation'; // import the types
const Stack = createNativeStackNavigator<RootStackParamList>(); // Type the stack navigator

const App = () => {
  return (
    //<NavigationContainer>
      <Stack.Navigator initialRouteName="Register">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="DoctorDashboard" component={DoctorDashboard} />
        <Stack.Screen name="PatientDashboard" component={PatientDashboard} />
        <Stack.Screen name="PrescriptionUpload" component={PrescriptionUpload} />
        <Stack.Screen name="MedicationReminder" component={MedicationReminder} />
      </Stack.Navigator>
    //</NavigationContainer>
  );
};

export default App;
