import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from './screens/HomeScreen';
import EmergencyContactsScreen from './screens/EmergencyContactsScreen';
import LocationSharingScreen from './screens/LocationSharingScreen';
import SOSScreen from './screens/SOSScreen';
import StatusScreen from './screens/StatusScreen';
import colors from './config/colors';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: colors.secondary,
          },
          headerTintColor: colors.text,
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ title: 'Safety Shield' }}
        />
        <Stack.Screen 
          name="EmergencyContacts" 
          component={EmergencyContactsScreen} 
          options={{ title: 'Emergency Contacts' }}
        />
        <Stack.Screen 
          name="LocationSharing" 
          component={LocationSharingScreen} 
          options={{ title: 'Location Sharing' }}
        />
        <Stack.Screen 
          name="SOS" 
          component={SOSScreen} 
          options={{ title: 'Emergency SOS' }}
        />
        <Stack.Screen 
          name="Status" 
          component={StatusScreen} 
          options={{ title: 'Real-Time Status' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}