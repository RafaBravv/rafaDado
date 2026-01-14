import { textoEstado } from '@/constants/colores';
import React from 'react';
import { Text } from 'react-native';

const StatusText = ({ isShaking }: { isShaking: boolean }) => (
    isShaking ? (
        <Text style={textoEstado.statusText}>
            '🎲 Girando...'
        </Text>
    ) : null 
);

export default StatusText;