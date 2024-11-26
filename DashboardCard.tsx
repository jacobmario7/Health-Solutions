import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Ensure you have react-native-vector-icons installed.

type DashboardCardProps = {
  title: string;
  iconName: string;
  onPress: () => void;
};

const DashboardCard: React.FC<DashboardCardProps> = ({ title, iconName, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Icon name={iconName} size={40} color="#FFFBEB" style={styles.icon} />
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#495579',
    borderRadius: 12,
    padding: 20,
    marginVertical: 10,
    alignItems: 'center',
    flexDirection: 'row',
    width: '90%',
    alignSelf: 'center',
    elevation: 5,
  },
  icon: {
    marginRight: 15,
  },
  title: {
    fontSize: 18,
    color: '#FFFBEB',
    fontWeight: 'bold',
  },
});

export default DashboardCard;
