import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import DashboardCard from './DashboardCard';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

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

const PatientDashboardScreen: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList,'DoctorDashboard'>>();

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.profileIcon} onPress={() => alert('Profile Settings')}>
        <Text style={styles.iconText}>⚙️</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Patient Dashboard</Text>

      <DashboardCard
        title="Appointment Booking"
        iconName="calendar-today"
        onPress={() => navigation.navigate('AppointmentBooking')}
      />
      <DashboardCard
        title="Patient History"
        iconName="history"
        onPress={() => navigation.navigate('PatientHistory')}
      />
      <DashboardCard
        title="Prescriptions"
        iconName="note-add"
        onPress={() => navigation.navigate('Prescriptions')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#263159',
    paddingTop: 50,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  profileIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  iconText: {
    fontSize: 28,
    color: '#FFFBEB',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFBEB',
    marginBottom: 30,
  },
});

export default PatientDashboardScreen;
