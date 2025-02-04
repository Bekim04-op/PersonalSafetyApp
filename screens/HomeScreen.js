import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import colors from '../config/colors';

const features = [
  { 
    title: 'Emergency Contacts',
    screen: 'EmergencyContacts',
    icon: 'people',
    color: '#4CAF50'
  },
  { 
    title: 'Location Sharing', 
    screen: 'LocationSharing',
    icon: 'location',
    color: '#2196F3'
  },
  { 
    title: 'SOS Alert', 
    screen: 'SOS',
    icon: 'alert-circle',
    color: '#E94560'
  },
  { 
    title: 'Real-Time Status', 
    screen: 'Status',
    icon: 'pulse',
    color: '#9C27B0'
  },
];

const HomeScreen = ({ navigation }) => {
  return (
    <LinearGradient
      colors={[colors.background, colors.secondary]}
      style={styles.container}
    >
      <Text style={styles.title}>Safety Shield</Text>
      <Text style={styles.subtitle}>Your Personal Safety Companion</Text>
      
      <View style={styles.grid}>
        {features.map((feature, index) => (
          <TouchableOpacity 
            key={index}
            style={styles.card}
            onPress={() => navigation.navigate(feature.screen)}
          >
            <View style={[styles.iconContainer, { backgroundColor: feature.color }]}>
              <Ionicons name={feature.icon} size={32} color="white" />
            </View>
            <Text style={styles.cardTitle}>{feature.title}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </LinearGradient>
  );
};

const { width } = Dimensions.get('window');
const cardSize = width * 0.4;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 50,
  },
  title: {
    fontSize: 32,
    color: colors.text,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#CCCCCC',
    textAlign: 'center',
    marginBottom: 30,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  card: {
    width: cardSize,
    height: cardSize,
    backgroundColor: colors.accent,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    elevation: 5,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
  },
  cardTitle: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default HomeScreen;