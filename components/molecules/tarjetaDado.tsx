import React from 'react';
import { View } from 'react-native';
import DiceNumber from '../atoms/numeroDado';
import StatusText from '../atoms/textoEstado';
import { dado } from '@/constants/colores'

const DiceDisplay = ({ diceValue, isShaking }: { diceValue: number; isShaking: boolean }) => (
  <View style={dado.diceContainer}>
    <DiceNumber value={diceValue} />
    <StatusText isShaking={isShaking} />
  </View>
);

export default DiceDisplay;