import { boton } from '@/constants/estilosBurger';
import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

interface IngredientButtonProps {
  emoji: string;
  label: string;
  onPress: () => void;
  backgroundColor: string;
  disabled?: boolean;
}

export const IngredientButton = ({ 
  emoji, 
  label, 
  onPress, 
  backgroundColor,
  disabled = false 
}: IngredientButtonProps) => {
  return (
    <TouchableOpacity 
      style={[
        boton.button, 
        { backgroundColor },
        disabled && boton.buttonDisabled
      ]} 
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
    >
      <Text style={boton.buttonText}>
        {emoji} {label}
      </Text>
    </TouchableOpacity>
  );
};