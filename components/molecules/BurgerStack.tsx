// Componente molecular que renderiza TODA la pila de ingredientes

import React, { useState, useEffect, useRef } from 'react';
import { View } from 'react-native';
import { GLView } from 'expo-gl';
import { Renderer } from 'expo-three';
import * as THREE from 'three';
// @ts-ignore
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { Asset } from 'expo-asset';
import { BurgerIngredient, INGREDIENT_HEIGHTS } from '@/types/burgerTypes';
import { BURGER_3D_CONFIG } from '@/constants/burgerConstants';
import { StyleBurgerStack } from '@/constants/estilosBurger';

interface BurgerStackProps {
  ingredients: BurgerIngredient[]; // Array de ingredientes a renderizar
}

export const BurgerStack = ({ ingredients }: BurgerStackProps) => {
  const [gl, setGL] = useState<any>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<Renderer | null>(null);
  const frameIdRef = useRef<number | null>(null);
  const loadedMeshesRef = useRef<Map<string, THREE.Object3D>>(new Map());

  // Setup inicial de la escena 3D
  useEffect(() => {
    if (!gl) return;

    const setupScene = () => {
      // Crear escena
      const newScene = new THREE.Scene();
      newScene.background = new THREE.Color(0xf5f5f5);
      sceneRef.current = newScene;

      // Configurar cámara
      const camera = new THREE.PerspectiveCamera(
        50,
        gl.drawingBufferWidth / gl.drawingBufferHeight,
        0.1,
        1000
      );
      camera.position.set(0, 0.5, BURGER_3D_CONFIG.cameraDistance);
      camera.lookAt(0, 0, 0);
      cameraRef.current = camera;

      // Configurar renderer
      const renderer = new Renderer({ gl });
      renderer.setSize(gl.drawingBufferWidth, gl.drawingBufferHeight);
      rendererRef.current = renderer;

      // Agregar luces
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
      newScene.add(ambientLight);

      const directionalLight1 = new THREE.DirectionalLight(0xffffff, 0.8);
      directionalLight1.position.set(5, 10, 5);
      newScene.add(directionalLight1);

      const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.4);
      directionalLight2.position.set(-5, 5, -5);
      newScene.add(directionalLight2);

      // Iniciar loop de renderizado
      startRenderLoop();
    };

    setupScene();

    return () => {
      if (frameIdRef.current) {
        cancelAnimationFrame(frameIdRef.current);
      }
      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
    };
  }, [gl]);

  // Cargar ingredientes cuando cambien
  useEffect(() => {
    if (!sceneRef.current) return;

    const loadIngredients = async () => {
      const scene = sceneRef.current!;
      
      // Limpiar meshes anteriores
      loadedMeshesRef.current.forEach((mesh) => {
        scene.remove(mesh);
      });
      loadedMeshesRef.current.clear();

      // Cargar todos los ingredientes
      for (let i = 0; i < ingredients.length; i++) {
        const ingredient = ingredients[i];
        const yPosition = calculateYPosition(i);
        
        try {
          const mesh = await loadModel(
            ingredient.modelPath,
            yPosition,
            ingredient.yRotation
          );
          
          scene.add(mesh);
          loadedMeshesRef.current.set(ingredient.id, mesh);
        } catch (error) {
          console.error(`Error cargando ingrediente ${ingredient.id}:`, error);
        }
      }
    };

    loadIngredients();
  }, [ingredients]);

  // Función para cargar un modelo 3D
  const loadModel = async (
    modelPath: any,
    yPosition: number,
    yRotation: number
  ): Promise<THREE.Object3D> => {
    const modelUri = Asset.fromModule(modelPath).uri;
    const loader = new GLTFLoader();
    
    const gltf = await new Promise<any>((resolve, reject) => {
      loader.load(
        modelUri,
        resolve,
        undefined,
        (error: unknown) => {
          console.error('Error en GLTFLoader:', error);
          reject(error);
        }
      );
    });    

    const mesh = gltf.scene;
    
    // Aplicar transformaciones
    mesh.scale.set(
      BURGER_3D_CONFIG.scale,
      BURGER_3D_CONFIG.scale,
      BURGER_3D_CONFIG.scale
    );
    mesh.position.set(0, yPosition, 0);
    mesh.rotation.y = yRotation;

    // Aplicar material a todas las mallas
    mesh.traverse((child: any) => {
      if (child.isMesh) {
        // Preservar color original si existe, sino usar blanco
        const originalColor = child.material?.color || new THREE.Color(0xFFFFFF);
        
        child.material = new THREE.MeshStandardMaterial({
          color: originalColor,
          roughness: 0.6,
          metalness: 0.2,
        });
      }
    });

    return mesh;
  };

  // Calcular la posición Y de cada ingrediente
  const calculateYPosition = (index: number): number => {
    let yPosition = BURGER_3D_CONFIG.baseYPosition;
    
    for (let i = 0; i < index; i++) {
      const ingredientType = ingredients[i].type;
      yPosition += INGREDIENT_HEIGHTS[ingredientType] + BURGER_3D_CONFIG.ingredientSpacing;
    }
    
    return yPosition;
  };

  // Loop de renderizado continuo
  const startRenderLoop = () => {
    const render = () => {
      frameIdRef.current = requestAnimationFrame(render);

      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);
        gl.endFrameEXP();
      }
    };

    render();
  };

  return (
    <View style={StyleBurgerStack.container}>
      <GLView
        style={StyleBurgerStack.glView}
        onContextCreate={(context) => setGL(context)}
      />
    </View>
  );
};