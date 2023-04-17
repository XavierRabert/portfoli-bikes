import { useNavigation } from "@react-navigation/native"
import { getAuth } from "firebase/auth"
import { collection, onSnapshot, query } from "firebase/firestore"
import { useContext, useEffect } from "react"
import { StyleSheet, View, Text } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"
import MaintenancesList from "../components/maintenances/MaintenancesList"
import { app, database } from "../config/firebase"
import BikeContext from "../context/bikeContext"
import MaintContext from "../context/maintContext"

function HomeScreen() {
    const navigation = useNavigation()

    const { setAllBikesCont } = useContext(BikeContext)
    const { allMaintCont, setAllMaintCont } = useContext(MaintContext)

    const user = getAuth(app)

    // Llegeix bicis
    useEffect(() => {
        const collectionRef = collection(database, `bikes-${user.currentUser.uid}`)
        const q = query(collectionRef)
        const unsuscribe = onSnapshot(q, querySnapshot => {
            setAllBikesCont(
                querySnapshot.docs.map(bike => ({
                    id: bike.id,
                    name: bike.data().name,
                    brand: bike.data().brand,
                    model: bike.data().model,
                    desc: bike.data().desc,
                    image: bike.data().image,
                    createdAt: bike.data().createdAt,
                }))
            )
        })
        return unsuscribe;
    }, [])

    // Llegeix els manteniment
    useEffect(() => {
        const collectionRef = collection(database, `maintenance-${user.currentUser.uid}`)
        const q = query(collectionRef)
        const unsuscribe = onSnapshot(q, querySnapshot => {
            setAllMaintCont(
                querySnapshot.docs.map(maint => ({
                    id: maint.id,
                    bike_id: maint.data().bike_id,
                    desc: maint.data().desc,
                    km: maint.data().km,
                    part_id: maint.data().part_id,
                    createdAt: maint.data().createdAt,
                }))
            )
        })
        return unsuscribe;
    }, [])

    return (
        <View style={styles.container}>
            <MaintenancesList maintenances={allMaintCont} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        _backgroundColor: 'rgb(107,142,35)',
        justifyContent: 'center',
        _alignItems: 'center',
        _position: 'relative'
    }
})

export default HomeScreen