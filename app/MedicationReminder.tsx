import React, { useState, useEffect } from 'react';
import { View, Text, Button, Alert, FlatList, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack'; // Import the navigation type
import { RootStackParamList } from '../types/navigation'; // Import the navigation type
import { getPatientPrescriptions, markDoseAsTaken } from '../services/prescriptionService'; // Import service functions

// Define the navigation prop for this screen
type MedicationReminderNavigationProp = NativeStackNavigationProp<RootStackParamList, 'MedicationReminder'>;

interface Prescription {
  id: string;
  medicationName: string;
  dosage: string;
  schedule: string;
  instructions: string;
}

const MedicationReminder = () => {
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]); // Store prescriptions
  const navigation = useNavigation<MedicationReminderNavigationProp>(); // Typed navigation
  
  // Fetch prescriptions when the screen loads
  useEffect(() => {
    const fetchPrescriptions = async () => {
      try {
        const response = await getPatientPrescriptions(); // Fetch patient's prescriptions
        if (response.success) {
          setPrescriptions(response.prescriptions); // Set prescriptions
        } else {
          Alert.alert('Error', response.message); // Handle error
        }
      } catch (error) {
        Alert.alert('Error', 'Failed to fetch prescriptions');
      }
    };

    fetchPrescriptions(); // Call the function on mount
  }, []);

  // Function to mark dose as taken
  const handleMarkAsTaken = async (prescriptionId: string) => {
    try {
      const response = await markDoseAsTaken(prescriptionId); // Call API to mark the dose
      if (response.success) {
        Alert.alert('Success', 'Dose marked as taken');
        // You could refetch prescriptions or update the UI accordingly
        setPrescriptions((prevPrescriptions) => 
          prevPrescriptions.filter((prescription) => prescription.id !== prescriptionId)
        );
      } else {
        Alert.alert('Error', response.message);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to mark dose as taken');
    }
  };

  // Render the list of prescriptions
  const renderItem = ({ item }: { item: Prescription }) => (
    <View style={styles.prescriptionCard}>
      <Text style={styles.medicationName}>{item.medicationName}</Text>
      <Text>Dosage: {item.dosage}</Text>
      <Text>Schedule: {item.schedule}</Text>
      <Text>Instructions: {item.instructions}</Text>
      <Button
        title="Mark as Taken"
        // onPress={() => handleMarkAsTaken(item.id)} // Call function when marked as taken
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Medication Schedule</Text>
      {prescriptions.length > 0 ? (
        <FlatList
          data={prescriptions}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      ) : (
        <Text>No prescriptions found.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  prescriptionCard: {
    backgroundColor: '#ffffff',
    padding: 15,
    marginBottom: 15,
    borderRadius: 8,
    shadowColor: '#000000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 2,
  },
  medicationName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default MedicationReminder;
