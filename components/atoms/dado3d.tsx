// components/atoms/Dado3D.tsx

import React, { useRef, useEffect, useState } from 'react';
import { View } from 'react-native';
import { GLView } from 'expo-gl';
import { Renderer } from 'expo-three';
import * as THREE from 'three';
import { Asset } from 'expo-asset';
import { DICE_3D_CONFIG } from '@/constants/dadoConstants';
// @ts-ignore
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { vistaDado } from '@/constants/colores';

interface Dado3DProps {
  value: number;
  isShaking: boolean;
  isStopped: boolean;
}

const Dado3D = ({ value, isShaking, isStopped }: Dado3DProps) => {
  const [gl, setGL] = useState<any>(null);
  const diceRef = useRef<THREE.Object3D | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<Renderer | null>(null);
  const frameIdRef = useRef<number | null>(null);
  
  // Referencias para la animación
  const targetRotationRef = useRef<THREE.Euler | null>(null);
  const initialRotationRef = useRef<THREE.Euler | null>(null);
  const animationStartTimeRef = useRef(0);
  const isAnimatingRef = useRef(false);
  const previousValueRef = useRef(value);

  // Setup inicial de la escena 3D
  useEffect(() => {
    if (!gl) return;

    const setup = async () => {
      const scene = new THREE.Scene();
      scene.background = new THREE.Color(0xffffff);
      sceneRef.current = scene;

      const camera = new THREE.PerspectiveCamera(
        75,
        gl.drawingBufferWidth / gl.drawingBufferHeight,
        0.1,
        1000
      );
      camera.position.z = DICE_3D_CONFIG.cameraDistance;
      cameraRef.current = camera;

      const renderer = new Renderer({ gl });
      renderer.setSize(gl.drawingBufferWidth, gl.drawingBufferHeight);
      rendererRef.current = renderer;

      const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
      scene.add(ambientLight);

      const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
      directionalLight.position.set(5, 5, 5);
      scene.add(directionalLight);

      try {
        const modelUri = Asset.fromModule(require('../../assets/models/dice.glb')).uri;
        
        const loader = new GLTFLoader();
        const gltf = await new Promise<any>((resolve, reject) => {
          loader.load(modelUri, resolve, undefined, reject);
        });
        
        const dice = gltf.scene;
        if (dice) {
          dice.scale.set(DICE_3D_CONFIG.scale, DICE_3D_CONFIG.scale, DICE_3D_CONFIG.scale);
          
          // Establecer rotación inicial
          const initialRotation = DICE_3D_CONFIG.rotations[1];
          dice.rotation.set(initialRotation.x, initialRotation.y, initialRotation.z);

          // Aplica color a todo el dado
          dice.traverse((child: any) => {
            if (child.isMesh) {
              // Crear material
              child.material = new THREE.MeshStandardMaterial({
                color: 0xFFFFFF,
                roughness: 0.5,
                metalness: 0.1,
              });
            }
          });
          
          scene.add(dice);
          diceRef.current = dice;
        }
      } catch (error) {
        console.error('Error al cargar el modelo del dado:', error);
        throw new Error('No se pudo cargar el modelo 3D del dado.');
      }

      startAnimation();
    };

    setup();

    return () => {
      if (frameIdRef.current) {
        cancelAnimationFrame(frameIdRef.current);
      }
      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
    };
  }, [gl]);

  // Detectar cuando se sacude para iniciar animación
  useEffect(() => {
    if (isShaking && value !== previousValueRef.current && diceRef.current) {
      previousValueRef.current = value;
      
      // Guardar rotación actual
      initialRotationRef.current = new THREE.Euler(
        diceRef.current.rotation.x,
        diceRef.current.rotation.y,
        diceRef.current.rotation.z
      );
      
      // Obtener rotación objetivo
      const rotation = DICE_3D_CONFIG.rotations[value as keyof typeof DICE_3D_CONFIG.rotations];
      targetRotationRef.current = new THREE.Euler(rotation.x, rotation.y, rotation.z);
      
      // Iniciar animación
      isAnimatingRef.current = true;
      animationStartTimeRef.current = Date.now();
    }
  }, [isShaking, value]);

  // Función para interpolar suavemente entre rotaciones
  const lerpRotation = (start: THREE.Euler, end: THREE.Euler, alpha: number): THREE.Euler => {
    return new THREE.Euler(
      start.x + (end.x - start.x) * alpha,
      start.y + (end.y - start.y) * alpha,
      start.z + (end.z - start.z) * alpha
    );
  };

  // Loop de animación
  const startAnimation = () => {
    const animate = () => {
      frameIdRef.current = requestAnimationFrame(animate);

      if (diceRef.current && isAnimatingRef.current && initialRotationRef.current && targetRotationRef.current) {
        const elapsed = Date.now() - animationStartTimeRef.current;
        const duration = DICE_3D_CONFIG.animationDuration;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing para animación más natural (easeOutCubic)
        const eased = 1 - Math.pow(1 - progress, 3);
        
        diceRef.current.rotation.copy(
          lerpRotation(initialRotationRef.current, targetRotationRef.current, eased)
        );
        
        if (progress >= 1) {
          // Animación completada - fijar en posición final
          diceRef.current.rotation.copy(targetRotationRef.current);
          isAnimatingRef.current = false;
        }
      }

      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);
        gl.endFrameEXP();
      }
    };

    animate();
  };

  return (
    <View style={vistaDado.container}>
      <GLView
        style={vistaDado.glView}
        onContextCreate={(context) => setGL(context)}
      />
    </View>
  );
};

export default Dado3D;