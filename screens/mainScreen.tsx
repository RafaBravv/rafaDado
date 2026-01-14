import React from 'react';
import { View, Text, Platform } from 'react-native';
import DiceDisplay from '../components/molecules/tarjetaDado';
import { indice } from '@/constants/colores'
import { Header } from '@react-navigation/elements';

export const mainScreen = () => {

  return (
    <View style={indice.container}>
      <Header title="Dado Virtual" />
      <DiceDisplay diceValue={diceValue} isShaking={isShaking} />
      <Text style={indice.hint}>
        {Platform.OS === 'web' 
          ? 'Esta app necesita un dispositivo móvil para funcionar' 
          : 'Sacude tu teléfono para tirar el dado'}
      </Text>
    </View>
  );
}