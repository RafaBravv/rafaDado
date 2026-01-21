// Declaraciones de tipos para soportar archivos 3D en el proyecto

declare module '*.glb' {
    const content: any;
    export default content;
  }
  
  declare module '*.gltf' {
    const content: any;
    export default content;
  }
  
  declare module '*.bin' {
    const content: any;
    export default content;
  }