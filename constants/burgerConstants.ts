// constants/burgerConstants.ts
// Constantes de configuración para la visualización 3D de la hamburguesa

export const BURGER_3D_CONFIG = {
    // Escala general de todos los modelos
    // 🔧 AJUSTA este valor según el tamaño de tus modelos
    scale: 0.3,
    
    // Distancia de la cámara
    // 🔧 AJUSTA si quieres ver la hamburguesa más cerca o más lejos
    cameraDistance: 3,
    
    // Posición Y base (donde empieza el pan de abajo)
    baseYPosition: -0.5,
    
    // Espaciado extra entre ingredientes (puede ser 0)
    ingredientSpacing: 0.02,
    
    // Configuración de animación al agregar ingredientes
    animationDuration: 400, // ms
    
    // Límite máximo de ingredientes (sin contar panes fijos)
    maxIngredients: 15,
  };
  
  // Paths a los modelos 3D
  // 🔧 ASEGÚRATE de que estos paths coincidan con la ubicación real de tus archivos .glb
  export const MODEL_PATHS = {
    PAN_ABAJO: require('@/assets/models/panAbajo.glb'),
    PAN_ARRIBA: require('@/assets/models/panArriba.glb'),
    PAN_MEDIO: require('@/assets/models/panMedio.glb'),
    CARNE: require('@/assets/models/carne.glb'),
    QUESO: require('@/assets/models/queso.glb'),
    LECHUGA: require('@/assets/models/lechuga1.glb'),
  };