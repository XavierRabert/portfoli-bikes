import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import BikeDetailScreen from './src/screens/BikeDetailScreen';
import BikesListScreen from './src/screens/BikesListScreen';

export default function App() {

  const Stack = createNativeStackNavigator()

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={screenOptions}>
        <Stack.Screen name='Bikes' component={BikesListScreen} options={{ title: 'Bikes', headerTitleAlign: 'center' }} />
        <Stack.Screen name='BikeDetail' component={BikeDetailScreen} options={({ route }) => ({ title: route.params.name })} />
      </Stack.Navigator>
    </NavigationContainer>

  );
}

const screenOptions = {
  headerStyle: {
    backgroundColor: 'blue'
  },
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontSize: 22,
    fontWeight: 'bold'
  },
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
