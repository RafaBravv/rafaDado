export const SHAKE_THRESHOLD = 1.3;
export const DICE_MIN = 1;
export const DICE_MAX = 6;
export const SHAKE_COOLDOWN = 1200; // ms - tiempo mínimo entre sacudidas

// Configuración 3D
export const DICE_3D_CONFIG = {
  // Rotaciones para cada cara del dado (en radianes)
  rotations: {
    1: { x: 0, y: 0, z: 0 },
    2: { x: Math.PI / 2, y: 0, z: 0 },
    3: { x: 0, y: Math.PI / 2, z: 0 },
    4: { x: 0, y: -Math.PI / 2, z: 0 },
    5: { x: -Math.PI / 2, y: 0, z: 0 },
    6: { x: Math.PI, y: 0, z: 0 },
  },
  animationDuration: 700, // Duración de la animación de rotación (en milisegundos)
  scale: 0.3, // Escala del dado
  cameraDistance: 1, // Distancia de la cámara
};