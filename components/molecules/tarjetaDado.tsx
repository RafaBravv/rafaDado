import React from 'react';
import { View } from 'react-native';
import StatusText from '../atoms/textoEstado';
import Dado3D from '../atoms/dado3d';
import { dado } from '@/constants/colores';

const DiceDisplay = ({ 
  diceValue, 
  isShaking, 
  isStopped 
}: { 
  diceValue: number; 
  isShaking: boolean;
  isStopped: boolean;
}) => (
  <View style={dado.diceContainer}>
    <Dado3D value={diceValue} isShaking={isShaking} isStopped={isStopped} />
    <StatusText isShaking={isShaking} />
  </View>
);

export default DiceDisplay;