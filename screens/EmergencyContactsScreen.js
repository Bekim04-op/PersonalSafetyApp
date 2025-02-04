import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Contacts from 'expo-contacts';
import { Ionicons } from '@expo/vector-icons';
import colors from '../config/colors';

const EmergencyContactsScreen = () => {
  const [contacts, setContacts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status !== 'granted') {
        setError('Permission to access contacts was denied');
        return;
      }

      const { data } = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.Name, Contacts.Fields.PhoneNumbers],
      });

      if (data.length > 0) {
        setContacts(data.filter(c => c.phoneNumbers && c.phoneNumbers.length > 0));
      }
    })();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.contactCard}>
      <View style={styles.contactHeader}>
        <Ionicons name="person-circle" size={24} color={colors.primary} />
        <Text style={styles.contactName}>{item.name}</Text>
      </View>
      {item.phoneNumbers.map((phone, index) => (
        <TouchableOpacity key={index} style={styles.phoneItem}>
          <Ionicons name="call" size={18} color={colors.text} />
          <Text style={styles.phoneNumber}>{phone.number}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  return (
    <LinearGradient
      colors={[colors.background, colors.secondary]}
      style={styles.container}
    >
      <Text style={styles.title}>Emergency Contacts</Text>
      
      {error ? (
        <Text style={styles.error}>{error}</Text>
      ) : (
        <FlatList
          data={contacts}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.list}
        />
      )}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    color: colors.text,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  contactCard: {
    backgroundColor: colors.accent,
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    elevation: 3,
  },
  contactHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  contactName: {
    color: colors.text,
    fontSize: 18,
    marginLeft: 10,
  },
  phoneItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: '#ffffff20',
  },
  phoneNumber: {
    color: colors.text,
    marginLeft: 10,
    fontSize: 16,
  },
  error: {
    color: colors.error,
    fontSize: 16,
    textAlign: 'center',
  },
  list: {
    paddingBottom: 20,
  },
});

export default EmergencyContactsScreen;