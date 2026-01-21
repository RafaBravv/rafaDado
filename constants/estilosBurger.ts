import { StyleSheet } from 'react-native';

export const StyleBurgerStack = StyleSheet.create({
    container: {
      width: '100%',
      height: 400,
      borderRadius: 20,
      overflow: 'hidden',
      backgroundColor: '#fff',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 5,
      elevation: 8,
    },
    glView: {
      flex: 1,
    },
  });

export const StyleBurgerBuilder = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f5f5f5',
    },
    content: {
      padding: 20,
      paddingBottom: 40,
    },
    burgerContainer: {
      marginBottom: 20,
      borderRadius: 20,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 5,
      elevation: 8,
    },
    ingredientCount: {
      textAlign: 'center',
      fontSize: 16,
      fontWeight: '600',
      color: '#666',
      marginBottom: 10,
    },
    buttonContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      gap: 10,
    },
    maxReachedText: {
      textAlign: 'center',
      fontSize: 16,
      fontWeight: 'bold',
      color: '#4CAF50',
      marginTop: 10,
      padding: 15,
      backgroundColor: '#E8F5E9',
      borderRadius: 12,
    },
  });

export const StyleBurgerScreen = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f5f5f5',
    },
    webWarning: {
      backgroundColor: '#FFF3CD',
      padding: 15,
      alignItems: 'center',
    },
    webWarningText: {
      color: '#856404',
      fontSize: 14,
      fontWeight: '600',
    },
  });

export const boton = StyleSheet.create({
    button: {
      flex: 1,
      minWidth: '45%',
      paddingVertical: 15,
      paddingHorizontal: 20,
      borderRadius: 12,
      alignItems: 'center',
      justifyContent: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 3,
      elevation: 3,
    },
    buttonDisabled: {
      opacity: 0.5,
    },
    buttonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
    },
  });