// components/organisms/BurgerBuilder.tsx
// Componente organismo REFACTORIZADO con botones atómicos y sin sistema de reset

import React, { useState, useCallback } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { BurgerStack } from '../molecules/BurgerStack';
import { IngredientButton } from '../atoms/ingredientsButton';
import { 
  BurgerIngredient, 
  IngredientType, 
  YAW_ROTATIONS 
} from '@/types/burgerTypes';
import { MODEL_PATHS, BURGER_3D_CONFIG, BUTTON_COLORS } from '@/constants/burgerConstants';
import { StyleBurgerBuilder } from '@/constants/estilosBurger';

export const BurgerBuilder = () => {
  // Estado principal: array de ingredientes
  const [ingredients, setIngredients] = useState<BurgerIngredient[]>(() => [
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

  const [ingredientCounter, setIngredientCounter] = useState(0);
  const [cheeseRotationIndex, setCheeseRotationIndex] = useState(0);
  const [lettuceRotationIndex, setLettuceRotationIndex] = useState(0);

  // Verificar si se alcanzó el límite máximo
  const isMaxReached = ingredients.length >= BURGER_3D_CONFIG.maxIngredients + 2;

  /**
   * Función optimizada para agregar ingredientes
   * Inserta en la penúltima posición (antes del pan de arriba)
   */
  const addIngredient = useCallback((
    type: IngredientType,
    modelPath: any,
    rotationIndex?: number
  ) => {
    if (isMaxReached) {
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
      position: ingredients.length - 1,
    };

    setIngredients(prev => {
      const newArray = [...prev];
      newArray.splice(prev.length - 1, 0, newIngredient);
      return newArray;
    });

    setIngredientCounter(prev => prev + 1);
  }, [ingredients, ingredientCounter, isMaxReached]);

  // Handlers para cada tipo de ingrediente
  const addMeat = () => {
    addIngredient(IngredientType.CARNE, MODEL_PATHS.CARNE);
  };

  const addCheese = () => {
    addIngredient(IngredientType.QUESO, MODEL_PATHS.QUESO, cheeseRotationIndex);
    setCheeseRotationIndex(prev => (prev + 1) % YAW_ROTATIONS.length);
  };

  const addLettuce = () => {
    addIngredient(IngredientType.LECHUGA, MODEL_PATHS.LECHUGA, lettuceRotationIndex);
    setLettuceRotationIndex(prev => (prev + 1) % YAW_ROTATIONS.length);
  };

  const addMiddleBun = () => {
    addIngredient(IngredientType.PAN_MEDIO, MODEL_PATHS.PAN_MEDIO);
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

        {/* Botones de control usando componente atómico */}
        <View style={StyleBurgerBuilder.buttonContainer}>
          <IngredientButton
            emoji="🍖"
            label="Carne"
            onPress={addMeat}
            backgroundColor={BUTTON_COLORS.MEAT}
            disabled={isMaxReached}
          />

          <IngredientButton
            emoji="🧀"
            label="Queso"
            onPress={addCheese}
            backgroundColor={BUTTON_COLORS.CHEESE}
            disabled={isMaxReached}
          />

          <IngredientButton
            emoji="🥬"
            label="Lechuga"
            onPress={addLettuce}
            backgroundColor={BUTTON_COLORS.LETTUCE}
            disabled={isMaxReached}
          />

          <IngredientButton
            emoji="🍞"
            label="Pan"
            onPress={addMiddleBun}
            backgroundColor={BUTTON_COLORS.BUN}
            disabled={isMaxReached}
          />
        </View>

        {/* Mensaje cuando se alcanza el límite */}
        {isMaxReached && (
          <Text style={StyleBurgerBuilder.maxReachedText}>
            🎉 ¡Hamburguesa completada! Máximo de ingredientes alcanzado.
          </Text>
        )}
      </View>
    </ScrollView>
  );
};