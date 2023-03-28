import { useContext, useEffect, useState } from "react"
import { FlatList, Pressable, StyleSheet, Text, View, Image } from "react-native"
import AddBike from "../../components/bikes/AddBike"
//import BikesList from "../../components/bikes/List/BikesList"

import { app, database } from '../../config/firebase'
import { collection, query, onSnapshot, QuerySnapshot } from "firebase/firestore";
import Button from "../../components/common/Button"
import { getAuth } from "firebase/auth"
import BikeContext from "../../context/bikeContext";
import { useNavigation } from "@react-navigation/native";
import colors from "../../common/colors";


const BikesList = ({ bikes }) => {

    const navigation = useNavigation()

    const { setBikeCont } = useContext(BikeContext)
    const separator = () => <View style={styles.separator} />

    onSelectBike = (value) => {
        setBikeCont(value)
        navigation.navigate('BikeDetail', { ...value })
    }

    return (
        <FlatList
            data={bikes}
            renderItem={({ item }) => (
                <Pressable onPress={() => onSelectBike(item)} >
                    <View style={styles.container_bike}>
                        <Image style={styles.image} source={item.image === '' ? { uri: 'https://via.placeholder.com/200' } : { uri: item.image }} />
                        <Text style={styles.name}>{item.name}</Text>
                        <Text style={styles.description}>{item.desc}</Text>
                    </View>
                </Pressable>
            )}
            keyExtractor={(item) => item.id}
            ItemSeparatorComponent={separator}
        />
    )
}




const BikesListScreen = () => {

    const [viewNewBike, setViewNewBike] = useState(false)
    const { allBikesCont } = useContext(BikeContext)

    return (
        <View style={styles.container} >
            <Button
                title={viewNewBike ? 'Cancel' : 'Add Bike'}
                onPress={() => setViewNewBike(!viewNewBike)}
                icon={viewNewBike ? 'close' : 'add'}
            />
            {viewNewBike ? <AddBike onSaveBike={setViewNewBike} /> : <BikesList bikes={allBikesCont} />}
        </View>
    )
}


const size = 80
const padding = 16

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    button: {
        margin: 15,
        backgroundColor: "blue",
        padding: 10,
        alignItems: 'center'
    },
    buttonText: {
        color: '#fff',
        fontSize: 15
    },
    container_bike: {
        flex: 1,
        flexDirection: 'row',
        height: size,
        paddingLeft: padding,
        alignItems: 'center',
        backgroundColor: colors.box,
        borderColor: colors.border,
        borderStyle: 'solid',
        borderWidth: 2,
        borderRadius: 5,
        margin: 5
    },
    container_text: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    image: {
        height: size - padding,
        width: size - padding,
        borderRadius: (size - padding) / 2,
        marginRight: padding,
    },
    name: {
        fontSize: 18,
        fontWeight: "bold",

    },
    description: {
        fontSize: 12,
        marginLeft: 5
    },
})

export default BikesListScreen