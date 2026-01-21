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
      marginBottom: 20,
    },
    buttonContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      gap: 10,
      marginBottom: 15,
    },
    button: {
      flex: 1,
      minWidth: '45%',
      paddingVertical: 15,
      paddingHorizontal: 20,
      borderRadius: 12,
      alignItems: 'center',
      justifyContent: 'center',
    },
    meatButton: {
      backgroundColor: '#8B4513',
    },
    cheeseButton: {
      backgroundColor: '#FFD700',
    },
    lettuceButton: {
      backgroundColor: '#90EE90',
    },
    bunButton: {
      backgroundColor: '#D2691E',
    },
    buttonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
    },
    resetButton: {
      backgroundColor: '#FF6B6B',
      paddingVertical: 12,
      paddingHorizontal: 30,
      borderRadius: 12,
      alignItems: 'center',
      marginBottom: 20,
    },
    resetButtonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
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