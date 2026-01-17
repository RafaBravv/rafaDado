// constants/dadoConstants.ts

export const SHAKE_THRESHOLD = 1.5;
export const DICE_MIN = 1;
export const DICE_MAX = 6;
export const SHAKE_COOLDOWN = 1000; // ms
export const DICE_STOP_DURATION = 5000; // ms - tiempo que el dado queda quieto

// Configuración 3D
export const DICE_3D_CONFIG = {
  // Rotaciones para cada cara del dado
  rotations: {
    1: { x: 0, y: 0, z: 0 },
    2: { x: Math.PI / 2, y: 0, z: 0 },
    3: { x: 0, y: Math.PI / 2, z: 0 },
    4: { x: 0, y: -Math.PI / 2, z: 0 },
    5: { x: -Math.PI / 2, y: 0, z: 0 },
    6: { x: Math.PI, y: 0, z: 0 },
  },
  // Velocidad de rotación cuando está girando
  spinSpeed: 0.2,
  // Velocidad de rotación idle
  idleSpeed: 0.01,
  scale: 2.0, // Escala del dado
  // Distancia de la cámara (reduce este valor para acercar la cámara)
  // Valores más pequeños = cámara más cerca = dado se ve más grande
  cameraDistance: 1,
};