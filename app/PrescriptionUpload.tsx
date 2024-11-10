import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { uploadPrescription } from '../services/prescriptionService';

const PrescriptionUpload = () => {
  const [medicationName, setMedicationName] = useState('');
  const [dosage, setDosage] = useState('');
  const [schedule, setSchedule] = useState('');
  const [instructions, setInstructions] = useState('');
  const navigation = useNavigation();

  const handleUpload = async () => {
    try {
      const response = await uploadPrescription({
        medicationName,
        dosage,
        schedule,
        instructions,
      });

      if (response.success) {
        Alert.alert('Success', 'Prescription uploaded successfully');
        navigation.goBack(); // Go back to the doctor dashboard
      } else {
        Alert.alert('Error', response.message);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to upload prescription');
    }
  };

  return (
    <ScrollView style={{ padding: 20 }}>
      <Text>Medication Name:</Text>
      <TextInput
        value={medicationName}
        onChangeText={setMedicationName}
        placeholder="Enter medication name"
        style={{ borderWidth: 1, marginBottom: 10, padding: 10 }}
      />
      <Text>Dosage:</Text>
      <TextInput
        value={dosage}
        onChangeText={setDosage}
        placeholder="Enter dosage (e.g., 1 tablet)"
        style={{ borderWidth: 1, marginBottom: 10, padding: 10 }}
      />
      <Text>Schedule (e.g., Morning, Afternoon, Night):</Text>
      <TextInput
        value={schedule}
        onChangeText={setSchedule}
        placeholder="Enter medication schedule"
        style={{ borderWidth: 1, marginBottom: 10, padding: 10 }}
      />
      <Text>Additional Instructions:</Text>
      <TextInput
        value={instructions}
        onChangeText={setInstructions}
        placeholder="Enter any additional instructions"
        style={{ borderWidth: 1, marginBottom: 10, padding: 10 }}
      />
      <Button title="Upload Prescription" onPress={handleUpload} />
    </ScrollView>
  );
};

export default PrescriptionUpload;
