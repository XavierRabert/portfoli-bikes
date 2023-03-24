import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Alert, StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';
import { BikeProvider } from './src/context/bikeContext';
import BikeDetailScreen from './src/screens/Bike/BikeDetailScreen';
import BikesListScreen from './src/screens/Bike/BikesListScreen';
import { app } from "./src/config/firebase"
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"
import Button from './src/components/common/Button';
import { useState } from 'react';
import MaintenancesListScreen from './src/screens/Bike/MaintenancesListScreen';


function HomeScreen() {
  const navigation = useNavigation()
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('Bikes')}>
        <Text>Bikes List</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Maintenance')}>
        <Text>Maintenances List</Text>
      </TouchableOpacity>
    </View>
  )
}

function LoginScreen() {
  const [email, setEmail] = useState(null)
  const [password, setPassword] = useState(null)

  const auth = getAuth(app)

  const navigation = useNavigation()

  const handleCreateAccount = () => {
    createUserWithEmailAndPassword(auth, email.trim(), password.trim())
      .then((userCredential) => {
        console.log('Account Created!')
        const user = userCredential.user
      })
      .catch(e => {
        console.log(e)
        Alert.alert(e.message)
      })
  }

  const handelSignIn = () => {
    signInWithEmailAndPassword(auth, email.trim(), password.trim())
      .then((userCredential) => {
        console.log('Signed in!')
        const user = userCredential.user
        navigation.navigate('Home')
      })
      .catch(e => {
        console.log(e)
        Alert.alert(e.message)
      })
  }

  return (
    <View style={styles.container}>
      <View style={styles.loginScreen}>

        <Text style={styles.text}>E-mail</Text>
        <TextInput onChangeText={(text) => setEmail(text)} style={styles.textInput} />

        <Text style={styles.text}>Password</Text>
        <TextInput onChangeText={(text) => setPassword(text)} style={styles.textInput} />

        <View>
          <Button onPress={handleCreateAccount} title="Create Account" icon='person' />
          <Button onPress={handelSignIn} title="Login" icon='login' />
        </View>
      </View>
    </View>

  )
}

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    // <SafeAreaView style={styles.container}>
    <NavigationContainer>
      <BikeProvider>
        <Stack.Navigator initialRouteName='Login' screenOptions={screenOptions}>
          <Stack.Screen name='Login' component={LoginScreen} />
          <Stack.Screen name='Home' component={HomeScreen} options={{ title: 'Home', headerTitleAlign: 'center', headerBackVisible: false }} />
          <Stack.Screen name='Bikes' component={BikesListScreen} options={{ title: 'Bikes', headerTitleAlign: 'center' }} />
          <Stack.Screen name='BikeDetail' component={BikeDetailScreen} options={({ route }) => ({ title: route.params.name })} />
          <Stack.Screen name='Maintenance' component={MaintenancesListScreen} options={{ title: 'Maintenances', headerTitleAlign: 'center' }} />
        </Stack.Navigator>
      </BikeProvider>
    </NavigationContainer>
    // </SafeAreaView>

  );
}


const screenOptions = {
  headerStyle: {
    backgroundColor: '#f4511e'
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
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center'
  },
  loginScreen: {
    _flex: 1,
    height: '70%',
    width: '90%',
    _alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'green',
    paddingHorizontal: 35,
    gap: 15
  },
  textInput: {
    backgroundColor: 'white',
    height: 50,
    borderRadius: 5,
    padding: 10,
    fontWeight: 'bold'
  },
  text: {
    color: '#f1f1f1',
    fontSize: 20,
    fontWeight: 'bold'
  }

});
