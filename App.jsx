import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import MyCamera from './src/components/common/MyCamera';
import BikeDetailScreen from './src/screens/Bike/BikeDetailScreen';
import BikesListScreen from './src/screens/Bike/BikesListScreen';

export default function App() {

  const Stack = createNativeStackNavigator()

  return (
    <SafeAreaView style={styles.container}>
      <NavigationContainer styles={styles.container}>
        <Stack.Navigator screenOptions={screenOptions}>
          <Stack.Screen name='Bikes' component={BikesListScreen} options={{ title: 'Bikes', headerTitleAlign: 'center' }} />
          <Stack.Screen name='BikeDetail' component={BikeDetailScreen} options={({ route }) => ({ title: route.params.name })} />
        </Stack.Navigator>
      </NavigationContainer>
      {/* <MyCamera>

      </MyCamera> */}
    </SafeAreaView>
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
    justifyContent: 'center',
  },
});
