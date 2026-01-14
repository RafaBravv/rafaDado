// src/components/molecules/DiceDisplay.js

import React from 'react';
import { View, StyleSheet } from 'react-native';
import DiceNumber from '../atoms/numeroDado';
import StatusText from '../atoms/textoEstado';

const DiceDisplay = ({ diceValue, isShaking }: { diceValue: number; isShaking: boolean }) => (
  <View style={styles.diceContainer}>
    <DiceNumber value={diceValue} />
    <StatusText isShaking={isShaking} />
  </View>
);

const styles = StyleSheet.create({
  diceContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
    backgroundColor: '#16213e',
    borderRadius: 20,
    minWidth: 200,
    minHeight: 200,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
});

export default DiceDisplay;