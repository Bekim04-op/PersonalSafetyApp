import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Location from 'expo-location';
import * as SMS from 'expo-sms';
import { Ionicons } from '@expo/vector-icons';
import colors from '../config/colors';

const SOSScreen = () => {
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

  const sendSOS = async () => {
    if (!location) return;

    const message = `🚨 EMERGENCY SOS! 🚨
I need immediate help! 
My location: https://www.google.com/maps?q=${location.coords.latitude},${location.coords.longitude}`;

    const { result } = await SMS.sendSMSAsync(
      ['+38345514936'], // Zëvendëso me numra realë
      message
    );
  };

  return (
    <LinearGradient
      colors={[colors.background, colors.secondary]}
      style={styles.container}
    >
      <Text style={styles.title}>Emergency SOS</Text>
      
      <View style={styles.card}>
        {error ? (
          <Text style={styles.error}>{error}</Text>
        ) : location ? (
          <>
            <View style={styles.locationInfo}>
              <Ionicons name="warning" size={32} color={colors.error} />
              <View style={styles.coordinates}>
                <Text style={styles.emergencyText}>Emergency Activated!</Text>
                <Text style={styles.text}>Lat: {location.coords.latitude.toFixed(4)}</Text>
                <Text style={styles.text}>Lng: {location.coords.longitude.toFixed(4)}</Text>
              </View>
            </View>
            <TouchableOpacity 
              style={styles.sosButton} 
              onPress={sendSOS}
              disabled={loading}
            >
              <Ionicons name="alert-circle" size={28} color="white" />
              <Text style={styles.sosButtonText}>SEND EMERGENCY ALERT</Text>
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
                <Text style={styles.buttonText= color="white"}>Enable Emergency System</Text>
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
    marginBottom: 25,
  },
  coordinates: {
    marginLeft: 15,
  },
  text: {
    color: colors.text,
    fontSize: 14,
    marginBottom: 2,
  },
  emergencyText: {
    color: colors.error,
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  sosButton: {
    flexDirection: 'row',
    backgroundColor: colors.error,
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
  },
  sosButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 15,
  },
  error: {
    color: colors.error,
    textAlign: 'center',
    marginBottom: 15,
  },
});

export default SOSScreen;