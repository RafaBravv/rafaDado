# RafaDado

Una aplicación móvil interactiva que simula el lanzamiento de un dado utilizando el acelerómetro del dispositivo. Simplemente sacude tu teléfono y observa cómo el dado gira en 3D hasta mostrar un resultado aleatorio.


https://github.com/user-attachments/assets/04b8e444-3e02-4574-b41f-f2d24221be4c


## ¿Qué hace esta aplicación?

Esta app convierte tu teléfono en un dado virtual. Cuando sacudes el dispositivo, el dado 3D gira de manera realista y se detiene mostrando un número del 1 al 6. Es como tener un dado físico en tu bolsillo, pero con animaciones fluidas y un diseño moderno.

### Características principales:
- Modelo 3D realista del dado
- Animación suave de 0.7 segundos al lanzar
- Utiliza el sensor de movimiento del teléfono para detectar sacudidas

## Propósito del Proyecto

Este proyecto fue creado como una demostración de:
- Integración de gráficos 3D en aplicaciones móviles React Native
- Uso de sensores de dispositivo para interacción natural
- Arquitectura limpia y escalable en aplicaciones móviles
- Prácticas modernas de desarrollo con TypeScript y Expo

## Tecnologías Utilizadas

### Renderizado 3D
- **Three.js** - Biblioteca para gráficos 3D en la web
- **expo-three** - Integración de Three.js con React Native
- **expo-gl** - Proporciona el contexto WebGL para renderizar gráficos 3D
- **GLTFLoader** - Cargador para modelos 3D en formato GLB

### Sensores
- **expo-sensors** - Acceso al acelerómetro del dispositivo para detectar movimientos

## Arquitectura del Proyecto

El proyecto sigue una arquitectura de componentes organizados por responsabilidad:

```
rafadado/
├── app/                        # Rutas y pantallas principales
│   ├── _layout.tsx            # Configuración de navegación
│   └── index.tsx              # Pantalla principal con lógica del dado
├── components/
│   ├── atoms/                 # Componentes básicos reutilizables
│   │   ├── dado3d.tsx        # Renderizado del modelo 3D
│   │   ├── numeroResultado.tsx # Indicador del resultado
│   │   └── textoEstado.tsx   # Texto de estado (girando...)
│   └── molecules/             # Componentes compuestos
│       ├── header.tsx         # Encabezado de la app
│       └── tarjetaDado.tsx   # Contenedor del dado 3D
├── screens/
│   └── mainScreen.tsx         # Pantalla principal que integra todo
├── constants/
│   ├── colores.ts            # Estilos y temas visuales
│   └── dadoConstants.ts      # Configuración del dado (rotaciones, tiempos)
└── assets/
    └── models/
        └── dice.glb          # Modelo 3D del dado
```

### Patrón de Diseño
- **Atomic Design**: Separación en atoms (componentes básicos) y molecules (componentes compuestos)
- **Separación de Responsabilidades**: Lógica de negocio separada de la presentación
- **Configuración Centralizada**: Constantes y estilos en archivos dedicados

## Cómo Usar

1. Abre la aplicación en tu dispositivo móvil
2. Sostén el teléfono firmemente
3. Sacude el dispositivo con un movimiento rápido
4. Observa cómo el dado gira y muestra el resultado
5. Espera 3 segundos antes de lanzar nuevamente

## Configuración Técnica

### Parámetros del Dado
- **Umbral de Sacudida**: 1.3 unidades de aceleración
- **Cooldown**: 1.2 segundo entre detecciones
- **Duración de Animación**: 700ms

### Renderizado 3D
- **Escala del Modelo**: 0.3x
- **Distancia de Cámara**: 1 unidad
- **Material**: MeshStandardMaterial con acabado semi-mate
- **Iluminación**: Luz ambiental + luz direccional

---

**Nota**: Esta aplicación requiere un dispositivo móvil físico con acelerómetro para funcionar correctamente. La versión web muestra una vista previa pero no puede detectar sacudidas.
