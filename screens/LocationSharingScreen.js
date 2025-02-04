import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Location from 'expo-location';
import * as SMS from 'expo-sms';
import { Ionicons } from '@expo/vector-icons';
import colors from '../config/colors';

const LocationSharingScreen = () => {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const getLocation = async () => {
    setLoading(true);
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setError('Location permission denied');
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      setError(null);
    } catch (err) {
      setError('Error getting location');
    } finally {
      setLoading(false);
    }
  };

  const shareLocation = async () => {
    if (!location) return;

    const message = `My current location: https://www.google.com/maps?q=${location.coords.latitude},${location.coords.longitude}`;
    const { result } = await SMS.sendSMSAsync(['EMERGENCY_CONTACT'], message);
  };

  return (
    <LinearGradient
      colors={[colors.background, colors.secondary]}
      style={styles.container}
    >
      <Text style={styles.title}>Share Location</Text>
      
      <View style={styles.card}>
        {error ? (
          <Text style={styles.error}>{error}</Text>
        ) : location ? (
          <>
            <View style={styles.locationInfo}>
              <Ionicons name="location" size={24} color={colors.primary} />
              <View style={styles.coordinates}>
                <Text style={styles.text}>Latitude: {location.coords.latitude.toFixed(4)}</Text>
                <Text style={styles.text}>Longitude: {location.coords.longitude.toFixed(4)}</Text>
              </View>
            </View>
            <TouchableOpacity 
              style={styles.button} 
              onPress={shareLocation}
              disabled={loading}
            >
              <Ionicons name="share-social" size={20} color="white" />
              <Text style={styles.buttonText}>Share Location</Text>
            </TouchableOpacity>
          </>
        ) : (
          <TouchableOpacity 
            style={styles.button} 
            onPress={getLocation}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="white" />
            ) : (
              <>
                <Ionicons name="locate" size={20} color="white" />
                <Text style={styles.buttonText}>Get Current Location</Text>
              </>
            )}
          </TouchableOpacity>
        )}
      </View>
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
    marginBottom: 30,
  },
  card: {
    backgroundColor: colors.accent,
    borderRadius: 15,
    padding: 20,
    elevation: 3,
  },
  locationInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  coordinates: {
    marginLeft: 15,
  },
  text: {
    color: colors.text,
    fontSize: 16,
    marginBottom: 5,
  },
  button: {
    flexDirection: 'row',
    backgroundColor: colors.primary,
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 10,
  },
  error: {
    color: colors.error,
    textAlign: 'center',
    marginBottom: 15,
  },
});

export default LocationSharingScreen;