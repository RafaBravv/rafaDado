import React from 'react';
import { Text, StyleSheet } from 'react-native';

const DiceNumber = ({ value }: { value: number }) => (
  <Text style={styles.diceNumber}>{value}</Text>
);

const styles = StyleSheet.create({
  diceNumber: {
    fontSize: 80,
    fontWeight: 'bold',
    color: '#e94560',
    marginBottom: 20,
  },
});

export default DiceNumber;