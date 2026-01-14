import React from 'react';
import { Text, StyleSheet } from 'react-native';

const StatusText = ({ isShaking }: { isShaking: boolean }) => (
  <Text style={styles.statusText}>
    {isShaking ? '🎲 Girando...' : 'Sacude tu dispositivo'}
  </Text>
);

const styles = StyleSheet.create({
  statusText: {
    fontSize: 18,
    color: '#0f3460',
    fontWeight: '600',
  },
});

export default StatusText;