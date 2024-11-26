import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import RegisterScreen from './RegisterScreen';
import LoginScreen from './PatientRegisterScreen';
import PatientRegisterScreen from './PatientRegisterScreen';
import PatientLoginScreen from './PatientLoginScreen';
import DoctorRegisterScreen from './DoctorRegistrationScreen';
import DoctorLoginScreen from './DoctorLoginScreen';
import DoctorDashboard from './DoctorDashboard';
import PatientDashboard from './PatientDashboard';
import AppointmentBookingScreen from './AppointmentBookingScreen';
import PatientHistoryScreen from './PatientHistoryScreen';
import AddPrescriptionScreen from './AddPrescriptionScreen';
import PrescriptionScreen from './PrescriptionScreen';


type RootStackParamList = {
  Register: undefined;
  Login: undefined;
  DoctorLogin: undefined;
  DoctorDashboard: { doctor: { name: string; email: string; licenseNumber: string; specialization: string } };
  PatientLogin:undefined;
  PatientRegister:undefined;
  DoctorRegister:undefined;
  PatientDashboard:undefined;
  AppointmentBooking:undefined;
  PatientHistory:undefined;
  AddPrescription:undefined;
  Prescriptions:undefined;
};

const Stack = createStackNavigator<RootStackParamList>();


const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="PatientRegister">
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="PatientRegister" component={PatientRegisterScreen} />
        <Stack.Screen name="PatientLogin" component={PatientLoginScreen} />
        <Stack.Screen name="DoctorRegister" component={DoctorRegisterScreen} />
        <Stack.Screen name="DoctorLogin" component={DoctorLoginScreen} />
        <Stack.Screen name="DoctorDashboard" component={DoctorDashboard} />
        <Stack.Screen name="PatientDashboard" component={PatientDashboard} />
        <Stack.Screen name="AppointmentBooking" component={AppointmentBookingScreen} />
        <Stack.Screen name="PatientHistory" component={PatientHistoryScreen} />
        <Stack.Screen name="AddPrescription" component={AddPrescriptionScreen} />
        <Stack.Screen name="Prescriptions" component={PrescriptionScreen} />
        

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
