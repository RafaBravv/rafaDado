import { StyleSheet } from 'react-native';

export const indice = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#1a1a2e',
    },
    content: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20,
      gap: 20,
    },
    hint: {
      marginTop: 30,
      fontSize: 14,
      color: '#7a7a7a',
      textAlign: 'center',
    },
});

export const dado = StyleSheet.create({
    diceContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      padding: 40,
      backgroundColor: '#ffffff',
      borderRadius: 20,
      minWidth: 200,
      minHeight: 200,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 5,
      elevation: 8,
    },
});

export const vistaDado = StyleSheet.create({
  container: {
    width: 240,
    height: 240,
    borderRadius: 20,
    overflow: 'hidden',
  },
  glView: {
    flex: 1,
  },
});

export const header = StyleSheet.create({
    headerContainer: {
        width: '100%',
        paddingTop: 20,
        paddingHorizontal: 20,
        backgroundColor: '#16213e',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#e94560',
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#fff',
    }
});

export const textoEstado = StyleSheet.create({
    statusText: {
      fontSize: 18,
      color: '#0f3460',
      fontWeight: '600',
    },
});

export const numDado = StyleSheet.create({
    diceNumber: {
      fontSize: 80,
      fontWeight: 'bold',
      color: '#e94560',
    },
});