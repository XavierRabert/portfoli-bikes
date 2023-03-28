import { useNavigation } from "@react-navigation/native"
import { getAuth } from "firebase/auth"
import { collection, onSnapshot, query } from "firebase/firestore"
import { useContext, useEffect } from "react"
import { StyleSheet, View, Text } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"
import { app, database } from "../config/firebase"
import BikeContext from "../context/bikeContext"


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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        _backgroundColor: 'rgb(107,142,35)',
        justifyContent: 'center',
        alignItems: 'center',
        _position: 'relative'
    }
})

export default HomeScreen