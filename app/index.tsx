import React, { useState, useEffect } from 'react';
import { Accelerometer } from 'expo-sensors';
import { SHAKE_THRESHOLD, DICE_MIN, DICE_MAX, SHAKE_COOLDOWN } from '../constants/dadoConstants';
import { MainScreen } from '@/screens/mainScreen';

export default function App() {
  const [diceValue, setDiceValue] = useState(1);
  const [isShaking, setIsShaking] = useState(false);
  const [isStopped, setIsStopped] = useState(false);
  const [lastShakeTime, setLastShakeTime] = useState(0);

  useEffect(() => {
    let subscription: ReturnType<typeof Accelerometer.addListener> | null = null;

    const subscribe = () => {
      subscription = Accelerometer.addListener(accelerometerData => {
        const { x, y, z } = accelerometerData;
        const acceleration = Math.sqrt(x * x + y * y + z * z);
        
        const currentTime = Date.now();
        const timeSinceLastShake = currentTime - lastShakeTime;

        // Permitir sacudidas solo si no está ya sacudiendo
        if (!isShaking && acceleration > SHAKE_THRESHOLD && timeSinceLastShake > SHAKE_COOLDOWN) {
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
  }, [lastShakeTime, isShaking]);

  const handleShake = () => {
    setIsShaking(true);
    setIsStopped(false);
    
    // Generar número aleatorio
    const randomValue = Math.floor(Math.random() * (DICE_MAX - DICE_MIN + 1)) + DICE_MIN;
    setDiceValue(randomValue);
    
    // Después de 0.7 segundos, detener la animación
    setTimeout(() => {
      setIsShaking(false);
      setIsStopped(true);
      
      // Después de 3 segundos, permitir nueva sacudida
      setTimeout(() => {
        setIsStopped(false);
      }, 3000);
    }, 700);
  };

  return (
    <MainScreen diceValue={diceValue} isShaking={isShaking} isStopped={isStopped} />
  );
}