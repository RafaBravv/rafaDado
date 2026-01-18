import React from 'react';
import { View, Text, Platform } from 'react-native';
import DiceDisplay from '../components/molecules/tarjetaDado';
import Header from '../components/molecules/header';
import { indice } from '@/constants/colores';
import StatusText from '@/components/atoms/textoEstado';

interface MainScreenProps {
  diceValue: number;
  isShaking: boolean;
  isStopped: boolean;
}

export const MainScreen = ({ diceValue, isShaking, isStopped }: MainScreenProps) => {
  return (
    <View style={indice.container}>
      <Header title="Dado Virtual" />
      <View style={indice.content}>
        <DiceDisplay diceValue={diceValue} isShaking={isShaking} isStopped={isStopped} />
        <StatusText isShaking={isShaking} />
        <Text style={indice.hint}>
          {Platform.OS === 'web' 
            ? 'Esta app necesita un dispositivo móvil para funcionar' 
            : 'Sacude tu teléfono para tirar el dado'}
        </Text>
      </View>
    </View>
  );
};