import { useEffect, useState } from "react"
import { Pressable, StyleSheet, Text, View } from "react-native"
import AddBike from "../components/bikes/List/AddBike"
import BikesList from "../components/bikes/BikesList"

import { database } from '../config/firebase'
import { collection, query, onSnapshot, QuerySnapshot } from "firebase/firestore";

const BikesListScreen = ({ navigation }) => {

    const [bikes, setBikes] = useState([])
    const [viewNewBike, setViewNewBike] = useState(false)



    useEffect(() => {
        const collectionRef = collection(database, 'bikes')
        const q = query(collectionRef)
        const unsuscribe = onSnapshot(q, querySnapshot => {
            setBikes(
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
        return unsuscribe;
    }, [])


    if (bikes.length === 0) return (
        <View >
            <Text >Nothing to see here {bikes.length}</Text>
        </View>)

    return (
        <View style={styles.container} >
            <Pressable onPress={setViewNewBike(!viewNewBike)}>
                <View style={styles.button}>
                    <Text>{viewNewBike ? 'Cancel' : 'Add Bike'}</Text>
                </View>
            </Pressable>

            {viewNewBike ? <AddBike onSaveBike={setViewNewBike} /> : <BikesList bikes={bikes} navigation={navigation} />}
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#999'
    },
    button: {
        margin: 15,
        backgroundColor: "#841584",
        padding: 10,
        alignItems: 'center'
    }
})

export default BikesListScreen