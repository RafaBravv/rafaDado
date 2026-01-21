// types/burgerTypes.ts
// Define los tipos de datos para los ingredientes de la hamburguesa

export enum IngredientType {
    PAN_ABAJO = 'PAN_ABAJO',
    CARNE = 'CARNE',
    QUESO = 'QUESO',
    LECHUGA = 'LECHUGA',
    PAN_MEDIO = 'PAN_MEDIO',
    PAN_ARRIBA = 'PAN_ARRIBA',
  }
  
  export interface BurgerIngredient {
    id: string; // ID único para cada ingrediente
    type: IngredientType; // Tipo de ingrediente
    modelPath: any; // Path al modelo 3D
    yRotation: number; // Rotación en el eje Y (yaw) en radianes
    position: number; // Posición en la pila (altura)
  }
  
  // Configuración de altura para cada tipo de ingrediente
  // 🔧 AJUSTA ESTOS VALORES según el tamaño real de tus modelos 3D
  export const INGREDIENT_HEIGHTS: Record<IngredientType, number> = {
    [IngredientType.PAN_ABAJO]: 0.15,    // Altura del pan inferior
    [IngredientType.CARNE]: 0.1,         // Altura de la carne
    [IngredientType.QUESO]: 0.05,        // Altura del queso
    [IngredientType.LECHUGA]: 0.08,      // Altura de la lechuga
    [IngredientType.PAN_MEDIO]: 0.12,    // Altura del pan medio
    [IngredientType.PAN_ARRIBA]: 0.15,   // Altura del pan superior
  };
  
  // Rotaciones predefinidas para variedad visual (en radianes)
  // 🔧 AJUSTA estos ángulos si quieres otras rotaciones
  export const YAW_ROTATIONS = [
    0,                  // 0°
    Math.PI / 4,        // 45°
    Math.PI / 2,        // 90°
    (3 * Math.PI) / 4,  // 135°
    Math.PI,            // 180°
    (5 * Math.PI) / 4,  // 225°
    (3 * Math.PI) / 2,  // 270°
    (7 * Math.PI) / 4,  // 315°
  ];