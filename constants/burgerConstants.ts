export const BURGER_3D_CONFIG = {
  // Escala general de todos los modelos
  scale: 0.48,
  
  // Distancia de la cámara
  // Valores típicos: 2 (cerca) - 5 (lejos)
  cameraDistance: 3.5,
  // Posición Y base (donde empieza el pan de abajo)
  baseYPosition: -1.1,
  // Espaciado extra entre ingredientes (puede ser 0)
  // 🔧 AJUSTA para más o menos separación entre capas
  ingredientSpacing: 0.04,
  // Configuración de animación al agregar ingredientes
  animationDuration: 400, // ms
  // Límite máximo de ingredientes (sin contar panes fijos)
  maxIngredients: 15,
};

// Paths a los modelos 3D
export const MODEL_PATHS = {
  PAN_ABAJO: require('../assets/models/panAbajo.glb'),
  PAN_ARRIBA: require('../assets/models/panArriba.glb'),
  PAN_MEDIO: require('../assets/models/panMedio.glb'),
  CARNE: require('../assets/models/carne.glb'),
  QUESO: require('../assets/models/queso.glb'),
  LECHUGA: require('../assets/models/lechuga.glb'),
};

export const BUTTON_COLORS = {
  MEAT: '#8B4513',      // Marrón para carne
  CHEESE: '#FFD700',    // Amarillo dorado para queso
  LETTUCE: '#90EE90',   // Verde claro para lechuga
  BUN: '#D2691E',       // Marrón claro para pan
};