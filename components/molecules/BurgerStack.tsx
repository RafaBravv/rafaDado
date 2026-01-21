// components/molecules/BurgerStack.tsx
// Componente molecular OPTIMIZADO que renderiza la pila de ingredientes
// ✨ MEJORA: Solo actualiza ingredientes nuevos, no recarga todo

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
  ingredients: BurgerIngredient[];
}

export const BurgerStack = ({ ingredients }: BurgerStackProps) => {
  const [gl, setGL] = useState<any>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<Renderer | null>(null);
  const frameIdRef = useRef<number | null>(null);
  
  // Mapeo de ingredientes cargados: id -> mesh 3D
  const loadedMeshesRef = useRef<Map<string, THREE.Object3D>>(new Map());
  
  // Tracking de ingredientes previos para detectar cambios
  const previousIngredientsRef = useRef<BurgerIngredient[]>([]);
  
  // Variables para rotación interactiva
  const isDraggingRef = useRef(false);
  const previousTouchRef = useRef<{ x: number; y: number } | null>(null);
  const rotationRef = useRef({ y: 0 }); // Rotación acumulada
  const containerRef = useRef<THREE.Group | null>(null);

  // Setup inicial de la escena 3D
  useEffect(() => {
    if (!gl) return;

    const setupScene = () => {
      const newScene = new THREE.Scene();
      newScene.background = new THREE.Color(0xf5f5f5);
      sceneRef.current = newScene;

      // Crear contenedor para todos los ingredientes (permite rotación)
      const container = new THREE.Group();
      newScene.add(container);
      containerRef.current = container;

      const camera = new THREE.PerspectiveCamera(
        50,
        gl.drawingBufferWidth / gl.drawingBufferHeight,
        0.1,
        1000
      );
      camera.position.set(0, 0.5, BURGER_3D_CONFIG.cameraDistance);
      camera.lookAt(0, 0, 0);
      cameraRef.current = camera;

      const renderer = new Renderer({ gl });
      renderer.setSize(gl.drawingBufferWidth, gl.drawingBufferHeight);
      rendererRef.current = renderer;

      // Iluminación
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
      newScene.add(ambientLight);

      const directionalLight1 = new THREE.DirectionalLight(0xffffff, 0.8);
      directionalLight1.position.set(5, 10, 5);
      newScene.add(directionalLight1);

      const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.4);
      directionalLight2.position.set(-5, 5, -5);
      newScene.add(directionalLight2);

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

  // 🚀 OPTIMIZACIÓN: Solo actualizar ingredientes que cambiaron
  useEffect(() => {
    if (!sceneRef.current || !containerRef.current) return;

    const updateIngredients = async () => {
      const container = containerRef.current!;
      const previousIngredients = previousIngredientsRef.current;

      // Detectar ingredientes nuevos
      const newIngredients = ingredients.filter(
        ing => !previousIngredients.find(prev => prev.id === ing.id)
      );

      // Detectar ingredientes eliminados
      const removedIngredients = previousIngredients.filter(
        prev => !ingredients.find(ing => ing.id === prev.id)
      );

      // Eliminar meshes de ingredientes removidos
      for (const removed of removedIngredients) {
        const mesh = loadedMeshesRef.current.get(removed.id);
        if (mesh) {
          container.remove(mesh);
          loadedMeshesRef.current.delete(removed.id);
        }
      }

      // Cargar solo ingredientes nuevos
      for (const newIng of newIngredients) {
        try {
          const yPosition = calculateYPosition(newIng.id);
          const mesh = await loadModel(
            newIng.modelPath,
            yPosition,
            newIng.yRotation
          );
          
          container.add(mesh);
          loadedMeshesRef.current.set(newIng.id, mesh);
        } catch (error) {
          console.error(`Error cargando ingrediente ${newIng.id}:`, error);
        }
      }

      // 🎯 OPTIMIZACIÓN CLAVE: Solo mover el pan de arriba hacia arriba
      // cuando se agrega un ingrediente nuevo (no reconstruir todo)
      if (newIngredients.length > 0) {
        const topBunId = ingredients[ingredients.length - 1]?.id;
        const topBunMesh = loadedMeshesRef.current.get(topBunId);
        
        if (topBunMesh) {
          const newYPosition = calculateYPosition(topBunId);
          
          // Animación suave del pan hacia arriba
          const startY = topBunMesh.position.y;
          const duration = 300; // ms
          const startTime = Date.now();

          const animateTopBun = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
            
            topBunMesh.position.y = startY + (newYPosition - startY) * eased;

            if (progress < 1) {
              requestAnimationFrame(animateTopBun);
            }
          };

          animateTopBun();
        }
      }

      previousIngredientsRef.current = [...ingredients];
    };

    updateIngredients();
  }, [ingredients]);

  // Calcular posición Y de un ingrediente específico
  const calculateYPosition = (ingredientId: string): number => {
    const index = ingredients.findIndex(ing => ing.id === ingredientId);
    if (index === -1) return BURGER_3D_CONFIG.baseYPosition;

    let yPosition = BURGER_3D_CONFIG.baseYPosition;
    
    for (let i = 0; i < index; i++) {
      const ingredientType = ingredients[i].type;
      yPosition += INGREDIENT_HEIGHTS[ingredientType] + BURGER_3D_CONFIG.ingredientSpacing;
    }
    
    return yPosition;
  };

  // Cargar modelo 3D
  const loadModel = async (
    modelPath: any,
    yPosition: number,
    yRotation: number
  ): Promise<THREE.Object3D> => {
    const modelUri = Asset.fromModule(modelPath).uri;
    const loader = new GLTFLoader();
    
    const gltf = await new Promise<any>((resolve, reject) => {
      loader.load(modelUri, resolve, undefined, reject);
    });

    const mesh = gltf.scene;
    
    mesh.scale.set(
      BURGER_3D_CONFIG.scale,
      BURGER_3D_CONFIG.scale,
      BURGER_3D_CONFIG.scale
    );
    mesh.position.set(0, yPosition, 0);
    mesh.rotation.y = yRotation;

    mesh.traverse((child: any) => {
      if (child.isMesh) {
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

  // Loop de renderizado continuo con rotación
  const startRenderLoop = () => {
    const render = () => {
      frameIdRef.current = requestAnimationFrame(render);

      // Aplicar rotación al contenedor
      if (containerRef.current) {
        containerRef.current.rotation.y = rotationRef.current.y;
      }

      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);
        gl.endFrameEXP();
      }
    };

    render();
  };

  // 🔄 Handlers para rotación táctil
  const handleTouchStart = (event: any) => {
    const touch = event.nativeEvent.touches[0];
    isDraggingRef.current = true;
    previousTouchRef.current = { x: touch.pageX, y: touch.pageY };
  };

  const handleTouchMove = (event: any) => {
    if (!isDraggingRef.current || !previousTouchRef.current) return;

    const touch = event.nativeEvent.touches[0];
    const deltaX = touch.pageX - previousTouchRef.current.x;
    
    // Rotar en base al movimiento horizontal
    rotationRef.current.y += deltaX * 0.01;
    
    previousTouchRef.current = { x: touch.pageX, y: touch.pageY };
  };

  const handleTouchEnd = () => {
    isDraggingRef.current = false;
    previousTouchRef.current = null;
  };

  return (
    <View 
      style={StyleBurgerStack.container}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <GLView
        style={StyleBurgerStack.glView}
        onContextCreate={(context) => setGL(context)}
      />
    </View>
  );
};