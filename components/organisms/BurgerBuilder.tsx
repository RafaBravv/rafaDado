// components/organisms/BurgerBuilder.tsx
// Componente organismo principal que controla toda la lógica de construcción de hamburguesa

import React, { useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { BurgerStack } from '../molecules/BurgerStack';
import { 
  BurgerIngredient, 
  IngredientType, 
  YAW_ROTATIONS 
} from '@/types/burgerTypes';
import { MODEL_PATHS, BURGER_3D_CONFIG } from '@/constants/burgerConstants';
import { StyleBurgerBuilder } from '@/constants/estilosBurger';

export const BurgerBuilder = () => {
  // Estado principal: array de ingredientes
  const [ingredients, setIngredients] = useState<BurgerIngredient[]>(() => [
    // Inicializar con pan de abajo y pan de arriba
    {
      id: 'pan-abajo-initial',
      type: IngredientType.PAN_ABAJO,
      modelPath: MODEL_PATHS.PAN_ABAJO,
      yRotation: 0,
      position: 0,
    },
    {
      id: 'pan-arriba-initial',
      type: IngredientType.PAN_ARRIBA,
      modelPath: MODEL_PATHS.PAN_ARRIBA,
      yRotation: 0,
      position: 1,
    },
  ]);

  // Contador para IDs únicos de ingredientes
  const [ingredientCounter, setIngredientCounter] = useState(0);
  
  // Contadores de rotación para queso y lechuga
  const [cheeseRotationIndex, setCheeseRotationIndex] = useState(0);
  const [lettuceRotationIndex, setLettuceRotationIndex] = useState(0);

  /**
   * Función principal para agregar ingredientes
   * Los nuevos ingredientes se insertan en la PENÚLTIMA posición
   * (antes del pan de arriba que siempre está al final)
   */
  const addIngredient = useCallback((
    type: IngredientType,
    modelPath: any,
    rotationIndex?: number
  ) => {
    // Verificar límite máximo
    if (ingredients.length >= BURGER_3D_CONFIG.maxIngredients + 2) {
      alert('¡Hamburguesa demasiado grande! Máximo alcanzado.');
      return;
    }

    const newIngredient: BurgerIngredient = {
      id: `ingredient-${ingredientCounter}`,
      type,
      modelPath,
      yRotation: rotationIndex !== undefined 
        ? YAW_ROTATIONS[rotationIndex % YAW_ROTATIONS.length] 
        : 0,
      position: ingredients.length - 1, // Penúltima posición
    };

    setIngredients(prev => {
      // Crear nuevo array insertando en penúltima posición
      const newArray = [...prev];
      newArray.splice(prev.length - 1, 0, newIngredient);
      return newArray;
    });

    setIngredientCounter(prev => prev + 1);
  }, [ingredients, ingredientCounter]);

  // 🍖 Agregar CARNE
  const addMeat = () => {
    addIngredient(IngredientType.CARNE, MODEL_PATHS.CARNE);
  };

  // 🧀 Agregar QUESO (con rotación variable)
  const addCheese = () => {
    addIngredient(IngredientType.QUESO, MODEL_PATHS.QUESO, cheeseRotationIndex);
    setCheeseRotationIndex(prev => (prev + 1) % YAW_ROTATIONS.length);
  };

  // 🥬 Agregar LECHUGA (con rotación variable)
  const addLettuce = () => {
    addIngredient(IngredientType.LECHUGA, MODEL_PATHS.LECHUGA, lettuceRotationIndex);
    setLettuceRotationIndex(prev => (prev + 1) % YAW_ROTATIONS.length);
  };

  // 🍞 Agregar PAN MEDIO
  const addMiddleBun = () => {
    addIngredient(IngredientType.PAN_MEDIO, MODEL_PATHS.PAN_MEDIO);
  };

  // 🗑️ Reiniciar hamburguesa (solo panes)
  const resetBurger = () => {
    setIngredients([
      {
        id: 'pan-abajo-reset',
        type: IngredientType.PAN_ABAJO,
        modelPath: MODEL_PATHS.PAN_ABAJO,
        yRotation: 0,
        position: 0,
      },
      {
        id: 'pan-arriba-reset',
        type: IngredientType.PAN_ARRIBA,
        modelPath: MODEL_PATHS.PAN_ARRIBA,
        yRotation: 0,
        position: 1,
      },
    ]);
    setIngredientCounter(0);
    setCheeseRotationIndex(0);
    setLettuceRotationIndex(0);
  };

  return (
    <ScrollView style={StyleBurgerBuilder.container}>
      <View style={StyleBurgerBuilder.content}>
        {/* Visualización 3D de la hamburguesa */}
        <View style={StyleBurgerBuilder.burgerContainer}>
          <BurgerStack ingredients={ingredients} />
        </View>

        {/* Información de ingredientes */}
        <Text style={StyleBurgerBuilder.ingredientCount}>
          Ingredientes: {ingredients.length - 2} / {BURGER_3D_CONFIG.maxIngredients}
        </Text>

        {/* Botones de control */}
        <View style={StyleBurgerBuilder.buttonContainer}>
          <TouchableOpacity 
            style={[StyleBurgerBuilder.button, StyleBurgerBuilder.meatButton]} 
            onPress={addMeat}
          >
            <Text style={StyleBurgerBuilder.buttonText}>🍖 Carne</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[StyleBurgerBuilder.button, StyleBurgerBuilder.cheeseButton]} 
            onPress={addCheese}
          >
            <Text style={StyleBurgerBuilder.buttonText}>🧀 Queso</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[StyleBurgerBuilder.button, StyleBurgerBuilder.lettuceButton]} 
            onPress={addLettuce}
          >
            <Text style={StyleBurgerBuilder.buttonText}>🥬 Lechuga</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[StyleBurgerBuilder.button, StyleBurgerBuilder.bunButton]} 
            onPress={addMiddleBun}
          >
            <Text style={StyleBurgerBuilder.buttonText}>🍞 Pan</Text>
          </TouchableOpacity>
        </View>

        {/* Botón de reset */}
        <TouchableOpacity 
          style={StyleBurgerBuilder.resetButton} 
          onPress={resetBurger}
        >
          <Text style={StyleBurgerBuilder.resetButtonText}>🗑️ Reiniciar</Text>
        </TouchableOpacity>


      </View>
    </ScrollView>
  );
};