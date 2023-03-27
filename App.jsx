import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Alert, StyleSheet, Text, TextInput, View, TouchableOpacity, ImageBackground } from 'react-native';
import BikeContext, { BikeProvider } from './src/context/bikeContext';
import BikeDetailScreen from './src/screens/Bike/BikeDetailScreen';
import BikesListScreen from './src/screens/Bike/BikesListScreen';
import { app, database } from "./src/config/firebase"
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"
import Button from './src/components/common/Button';
import { useContext, useEffect, useState } from 'react';
import MaintenancesListScreen from './src/screens/Maintenance/MaintenancesListScreen';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { SafeAreaView } from 'react-native-safe-area-context';
import { collection, onSnapshot, query } from 'firebase/firestore';



function HomeScreen() {
  const navigation = useNavigation()

  const user = getAuth(app)
  const { allBikesCont, setAllBikesCont } = useContext(BikeContext)

  useEffect(() => {
    const collectionRef = collection(database, `bikes-${user.currentUser.uid}`)
    const q = query(collectionRef)
    const unsuscribe = onSnapshot(q, querySnapshot => {
      setAllBikesCont(
        querySnapshot.docs.map(bike => ({
          id: bike.id,
          name: bike.data().name,
          brand: bike.data().brand,
          mode: bike.data().model,
          desc: bike.data().desc,
          image: bike.data().image,
        }))
      )
    })
    console.log(allBikesCont)
    return unsuscribe;
  }, [])


  return (
    <View style={styles.container}>

      <TouchableOpacity onPress={() => navigation.navigate('Bikes')}>
        <Text>Bikes List</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Parts')}>
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
      <ImageBackground source={require('./src/images/Login.jpg')}
        style={styles.image}
        resizeMode="cover"
        imageStyle={{
          position: 'absolute',
          top: 0,
          left: 0,
        }}>


        {/* <View style={styles.squareContainer}>
          <View style={styles.square} />
          <View style={styles.circle} />
          <View style={styles.triangle} />
        </View> */}
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

function HandleLogOut() {
  const navigation = useNavigation()
  const auth = getAuth(app)
  auth.signOut()
    .then(() => console.log('User signed out!'));
  navigation.navigate('Login')
}

const Stack = createNativeStackNavigator()
const Drawer = createDrawerNavigator();
export default function App() {

  return (
    <SafeAreaView style={styles.containerAll}>
      <BikeProvider>
        <NavigationContainer>
          <Drawer.Navigator screenOptions={screenOptions}>
            <Drawer.Screen name='Login' component={LoginScreen} options={{ headerShown: false, drawerItemStyle: { display: 'none' } }} />
            <Drawer.Screen name='Logout' component={HandleLogOut} />
            <Drawer.Screen name='Home' component={HomeScreen} options={{ title: 'Home', headerTitleAlign: 'center', headerBackVisible: false }} />
            <Drawer.Screen name="Bikes" component={BikesListScreen} options={{ title: 'Bikes', headerTitleAlign: 'center' }} />
            <Drawer.Screen name="BikeDetail" component={BikeDetailScreen}
              options={({ route }) => ({
                title: route.params
                  ? route.params.name
                  : "",
                headerTitleAlign: 'center',
                drawerItemStyle: { display: 'none' }
              })} />
            <Drawer.Screen name="Parts" component={MaintenancesListScreen} options={{ title: 'Parts', headerTitleAlign: 'center' }} />
          </Drawer.Navigator>
        </NavigationContainer>
      </BikeProvider>
    </SafeAreaView>

  );
}


const screenOptions = {
  headerStyle: {
    backgroundColor: '#DF2E38'
  },
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontSize: 22,
    fontWeight: 'bold'
  },
}

const styles = StyleSheet.create({
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
  // squareContainer: {
  //   flex: 1,
  //   height: '100%',
  //   position: 'absolute',
  //   _alignItems: 'center',
  //   justifyContent: 'space-around'
  // },
  // square: {
  //   height: 150,
  //   width: 150,
  //   borderRadius: 5,
  //   backgroundColor: 'red',
  //   transform: [{ rotate: '65deg' }],
  //   margin: 25
  // },
  // circle: {
  //   height: 150,
  //   width: 150,
  //   borderRadius: 75,
  //   backgroundColor: 'blue',
  //   margin: 25
  // },
  // triangle: {
  //   width: 0,
  //   height: 0,
  //   backgroundColor: 'transparent',
  //   borderStyle: 'solid',
  //   borderTopWidth: 0,
  //   borderRightWidth: 75,
  //   borderBottomWidth: 150,
  //   borderLeftWidth: 75,
  //   borderTopColor: 'transparent',
  //   borderRightColor: 'transparent',
  //   borderBottomColor: 'yellow',
  //   borderLeftColor: 'transparent',
  //   transform: [{ rotate: '15deg' }],
  //   margin: 25
  // },
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
