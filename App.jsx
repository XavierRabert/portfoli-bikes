import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { Alert, StyleSheet, Text, TextInput, View, ImageBackground } from 'react-native';
import { BikeProvider } from './src/context/bikeContext';
import BikeDetailScreen from './src/screens/Bike/BikeDetailScreen';
import BikesListScreen from './src/screens/Bike/BikesListScreen';
import { app } from "./src/config/firebase"
import {
  getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword,
} from "firebase/auth"
import Button from './src/components/common/Button';
import { useState } from 'react';
import MaintenancesListScreen from './src/screens/Maintenance/MaintenancesListScreen';
import { createDrawerNavigator, DrawerContentScrollView } from '@react-navigation/drawer';
import { SafeAreaView } from 'react-native-safe-area-context';
import MenuOption from './src/components/common/MenuOption';
import MenuUserOption from './src/components/common/MenuUserOption';
import HomeScreen from './src/screens/HomeScreen';
import UserScreen from './src/screens/UserScreen';

function LoginScreen() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

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
      .then(
        async (userCredential) => {
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
      <ImageBackground source={require('./src/images/Login.jpg')}
        style={styles.image}
        resizeMode="cover"
        imageStyle={{
          position: 'absolute',
          top: 0,
          left: 0,
        }}>

        <View style={styles.loginScreen}>

          <Text style={styles.text}>E-mail</Text>
          <TextInput onChangeText={(text) => setEmail(text)} style={styles.textInput} />

          <Text style={styles.text}>Password</Text>
          <TextInput secureTextEntry={true} onChangeText={(text) => setPassword(text)} style={styles.textInput} />

          <View>
            <Button onPress={handleCreateAccount} title="Create Account" icon='person' />
            <Button onPress={handelSignIn} title="Login" icon='login' />
          </View>
        </View>
      </ImageBackground>
    </View>

  )
}


const Drawer = createDrawerNavigator();
export default function App() {



  return (
    <SafeAreaView style={styles.containerAll}>
      <BikeProvider>
        <NavigationContainer>
          <Drawer.Navigator screenOptions={screenOptions}
            drawerContent={(props) => <MenuItems {...props} />}
          >
            <Drawer.Screen name='Login' component={LoginScreen} options={{ headerShown: false }} />
            <Drawer.Screen name='Home' component={HomeScreen} options={{ title: 'Home' }} />
            <Drawer.Screen name='User' component={UserScreen} options={{ title: 'User' }} />
            <Drawer.Screen name="BikesList" component={BikesListScreen} options={{ title: 'Bikes' }} />
            <Drawer.Screen name="BikeDetail" component={BikeDetailScreen}
              options={({ route }) => ({ title: route.params ? route.params.name : "" })} />
            <Drawer.Screen name="Parts" component={MaintenancesListScreen} options={{ title: 'Parts' }} />
          </Drawer.Navigator>

        </NavigationContainer>

      </BikeProvider>
    </SafeAreaView>

  );
}


const MenuItems = ({ navigation }) => {

  const user = getAuth()

  return (
    <DrawerContentScrollView style={styles.containerMenu}>

      <MenuUserOption {...user.currentUser} onPress={() => navigation.navigate('User')} />

      <MenuOption text="Bikes" onPress={() => navigation.navigate('BikesList')} />
      <MenuOption text="Maintenance Parts" onPress={() => navigation.navigate('Parts')} />
      <MenuOption text="Home" onPress={() => navigation.navigate('Home')} />

    </DrawerContentScrollView>
  )
}

const screenOptions = {
  headerStyle: {
    backgroundColor: '#DF2E38'
  },
  headerTitleAlign: 'center',
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontSize: 18,
    fontWeight: 'bold'
  },
}

const styles = StyleSheet.create({
  containerMenu: {
    padding: 15,
  },
  textMenu: {
    fontWeight: 'bold',
    fontSize: 20
  },
  containerAll: {
    flex: 1,
  },
  container: {
    flex: 1,
    _backgroundColor: 'rgb(107,142,35)',
    justifyContent: 'center',
    alignItems: 'center',
    _position: 'relative'
  },
  image: {
    flex: 1,
    justifyContent: 'center',
    width: '100%',
    alignItems: 'center'
  },
  loginScreen: {
    width: '90%',
    justifyContent: 'center',
    backgroundColor: '#444b',
    paddingHorizontal: 35,
    gap: 15,
    padding: 30,
    borderRadius: 5

  },
  textInput: {
    backgroundColor: 'white',
    height: 50,
    borderRadius: 5,
    padding: 10,
    fontWeight: 'bold',
    color: '#222'
  },
  text: {
    color: '#f1f1f1',
    fontSize: 20,
    fontWeight: 'bold'
  }

});
