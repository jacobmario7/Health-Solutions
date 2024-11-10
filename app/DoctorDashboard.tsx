import React from 'react';
import { View, Text, Button } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '@/types/navigation';

const DoctorDashboard = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <View style={{ padding: 20 }}>
      <Text>Doctor Dashboard</Text>
      <Button
        title="Upload Prescription"
        onPress={() => navigation.navigate('PrescriptionUpload')}
      />
    </View>
  );
};

export default DoctorDashboard;
