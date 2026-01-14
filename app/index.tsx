// App.js

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { Accelerometer } from 'expo-sensors';
import DiceDisplay from '../components/molecules/pantallaDado';
import { SHAKE_THRESHOLD, DICE_MIN, DICE_MAX, SHAKE_COOLDOWN } from '../constants/dadoConstants';

export default function App() {
  const [diceValue, setDiceValue] = useState(1);
  const [isShaking, setIsShaking] = useState(false);
  const [lastShakeTime, setLastShakeTime] = useState(0);

  useEffect(() => {
    let subscription: ReturnType<typeof Accelerometer.addListener> | null = null;

    const subscribe = () => {
      subscription = Accelerometer.addListener(accelerometerData => {
        const { x, y, z } = accelerometerData;
        const acceleration = Math.sqrt(x * x + y * y + z * z);
        
        const currentTime = Date.now();
        const timeSinceLastShake = currentTime - lastShakeTime;

        if (acceleration > SHAKE_THRESHOLD && timeSinceLastShake > SHAKE_COOLDOWN) {
          handleShake();
          setLastShakeTime(currentTime);
        }
      });
      
      Accelerometer.setUpdateInterval(100);
    };

    subscribe();

    return () => {
      if (subscription) {
        subscription.remove();
      }
    };
  }, [lastShakeTime]);

  const handleShake = () => {
    setIsShaking(true);
    
    setTimeout(() => {
      const randomValue = Math.floor(Math.random() * (DICE_MAX - DICE_MIN + 1)) + DICE_MIN;
      setDiceValue(randomValue);
      setIsShaking(false);
    }, 500);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dado Virtual</Text>
      <DiceDisplay diceValue={diceValue} isShaking={isShaking} />
      <Text style={styles.hint}>
        {Platform.OS === 'web' 
          ? 'Esta app necesita un dispositivo móvil para funcionar' 
          : 'Sacude tu teléfono para tirar el dado'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 50,
  },
  hint: {
    marginTop: 40,
    fontSize: 14,
    color: '#7a7a7a',
    textAlign: 'center',
  },
});