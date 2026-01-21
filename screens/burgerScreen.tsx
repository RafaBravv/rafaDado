// screens/BurgerScreen.tsx
// Pantalla principal que muestra el constructor de hamburguesas

import React from 'react';
import { View, Platform, Text } from 'react-native';
import { BurgerBuilder } from '@/components/organisms/BurgerBuilder';
import Header from '@/components/molecules/header';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleBurgerScreen } from '@/constants/estilosBurger';

export const BurgerScreen = () => {
  return (
    <SafeAreaView style={StyleBurgerScreen.container} edges={['top']}>
      <Header title="Constructor de Hamburguesas" />
      
      {Platform.OS === 'web' ? (
        <View style={StyleBurgerScreen.webWarning}>
          <Text style={StyleBurgerScreen.webWarningText}>
            ⚠️ Esta aplicación funciona mejor en dispositivos móviles
          </Text>
        </View>
      ) : null}
      
      <BurgerBuilder />
    </SafeAreaView>
  );
};