const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Agregar extensión .glb como asset
config.resolver.assetExts.push('glb', 'gltf', 'bin');

// Asegurarse de que .glb no esté en sourceExts
config.resolver.sourceExts = config.resolver.sourceExts.filter(
  ext => !['glb', 'gltf', 'bin'].includes(ext)
);

module.exports = config;