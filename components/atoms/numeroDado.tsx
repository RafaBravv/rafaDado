import { numDado } from '@/constants/colores';
import React from 'react';
import { Text } from 'react-native';

const DiceNumber = ({ value }: { value: number }) => (
  <Text style={numDado.diceNumber}>{value}</Text>
);

export default DiceNumber;