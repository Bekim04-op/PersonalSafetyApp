import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import colors from '../config/colors';

const StatusScreen = () => {
  const [status, setStatus] = useState('ACTIVE');
  const pulseAnim = new Animated.Value(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setStatus(prev => prev === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE');
    }, 5000);

    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.2,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();

    return () => clearInterval(interval);
  }, []);

  return (
    <LinearGradient
      colors={[colors.background, colors.secondary]}
      style={styles.container}
    >
      <Text style={styles.title}>Real-Time Status Monitor</Text>
      
      <View style={styles.statusCard}>
        <Animated.View style={[
          styles.statusIndicator, 
          { 
            backgroundColor: status === 'ACTIVE' ? colors.success : colors.error,
            transform: [{ scale: pulseAnim }]
          }
        ]}>
          <Ionicons 
            name={status === 'ACTIVE' ? 'checkmark-circle' : 'close-circle'} 
            size={60} 
            color="white" 
          />
        </Animated.View>
        
        <Text style={styles.statusText}>
          System Status: {status}
        </Text>
        
        <View style={styles.statusDetails}>
          <View style={styles.detailItem}>
            <Ionicons name="time" size={24} color={colors.text} />
            <Text style={styles.detailText}>Last Update: {new Date().toLocaleTimeString()}</Text>
          </View>
          <View style={styles.detailItem}>
            <Ionicons name="heart-circle" size={24} color={colors.text} />
            <Text style={styles.detailText}>System Health: Optimal</Text>
          </View>
        </View>
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
  statusCard: {
    backgroundColor: colors.accent,
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    elevation: 5,
  },
  statusIndicator: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  statusText: {
    color: colors.text,
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 25,
  },
  statusDetails: {
    width: '100%',
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ffffff30',
  },
  detailText: {
    color: colors.text,
    fontSize: 16,
    marginLeft: 15,
  },
});

export default StatusScreen;