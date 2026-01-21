import { StyleSheet } from 'react-native';

export const indice = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#FAFAFA',
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
      backgroundColor: '#FFF',
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
        paddingHorizontal: 20,
        backgroundColor: '#EAEAEA',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#666',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
    }
});

export const textoEstado = StyleSheet.create({
    statusText: {
      fontSize: 18,
      color: '#0F0F0F',
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