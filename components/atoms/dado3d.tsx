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

  // Setup inicial de la escena 3D
  useEffect(() => {
    if (!gl) return;

    const setup = async () => {
      // Configurar escena
      const scene = new THREE.Scene();
      scene.background = new THREE.Color(0xffffff);
      sceneRef.current = scene;

      // Configurar cámara
      const camera = new THREE.PerspectiveCamera(
        75,
        gl.drawingBufferWidth / gl.drawingBufferHeight,
        0.1,
        1000
      );
      camera.position.z = DICE_3D_CONFIG.cameraDistance;
      cameraRef.current = camera;

      // Configurar renderer
      const renderer = new Renderer({ gl });
      renderer.setSize(gl.drawingBufferWidth, gl.drawingBufferHeight);
      rendererRef.current = renderer;

      // Agregar luces
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
      scene.add(ambientLight);

      const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
      directionalLight.position.set(5, 5, 5);
      scene.add(directionalLight);

      // Cargar modelo GLB
      let dice: THREE.Object3D | null = null;
      
      try {
        // Opción 1: Intentar cargar desde URI directa
        const modelUri = Asset.fromModule(require('../../assets/models/dice.glb')).uri;
        
        const loader = new GLTFLoader();
        const gltf = await new Promise<any>((resolve, reject) => {
          loader.load(
            modelUri,
            resolve,
            undefined,
            reject
          );
        });
        
        dice = gltf.scene;
        if (dice) {
          dice.scale.set(DICE_3D_CONFIG.scale, DICE_3D_CONFIG.scale, DICE_3D_CONFIG.scale);
          scene.add(dice);
          diceRef.current = dice;
        }
      } catch (error) {
        console.error('Error al cargar el modelo del dado:', error);
        console.error('Detalles:', JSON.stringify(error, null, 2));
        throw new Error('No se pudo cargar el modelo 3D del dado. Asegúrate de que el archivo dice.glb existe en assets/models/');
      }

      // Iniciar el loop de animación
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

  // Loop de animación separado que responde a cambios de estado
  const startAnimation = () => {
    const animate = () => {
      frameIdRef.current = requestAnimationFrame(animate);

      if (diceRef.current) {
        if (isShaking) {
          // Rotación rápida cuando está girando
          diceRef.current.rotation.x += DICE_3D_CONFIG.spinSpeed;
          diceRef.current.rotation.y += DICE_3D_CONFIG.spinSpeed;
        } else if (!isStopped) {
          // Rotación suave cuando está en idle (no detenido)
          diceRef.current.rotation.x += DICE_3D_CONFIG.idleSpeed;
          diceRef.current.rotation.y += DICE_3D_CONFIG.idleSpeed;
        }
        // Si isStopped es true, el dado no rota en absoluto
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