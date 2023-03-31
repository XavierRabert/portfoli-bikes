import { useContext, useEffect, useState } from "react"
import { FlatList, Pressable, StyleSheet, Text, View, Image } from "react-native"
import AddBike from "../../components/bikes/AddBike"
import BikeContext from "../../context/bikeContext";
import { useNavigation } from "@react-navigation/native";
import colors from "../../common/colors";
import { TouchableOpacity } from "react-native-gesture-handler";
import { MaterialIcons } from '@expo/vector-icons'


const BikesList = ({ bikes }) => {
    const navigation = useNavigation()
    // const { setBikeCont } = useContext(BikeContext)

    // onSelectBike = (value) => {
    //     setBikeCont(value)
    //     navigation.navigate('BikeDetail', { ...value })
    // }

    return (
        <FlatList
            data={bikes}
            renderItem={({ item }) => (
                <Pressable onPress={() => navigation.navigate('BikeDetail', { ...item })} >
                    <View style={styles.container_bike}>
                        <Image style={styles.image} source={item.image === '' ? { uri: 'https://via.placeholder.com/200' } : { uri: item.image }} />
                        <Text style={styles.name}>{item.name}</Text>
                        <Text style={styles.description}>{item.desc}</Text>
                    </View>
                </Pressable>
            )}
            keyExtractor={(item) => item.id}
        />
    )
}




const BikesListScreen = () => {
    const navigation = useNavigation()
    const [viewNewBike, setViewNewBike] = useState(false)

    const { allBikesCont } = useContext(BikeContext)


    // Opcions de menu
    useEffect(() => {
        if (!viewNewBike) {
            navigation.setOptions({
                headerRight: () => (
                    <View style={{ flexDirection: 'row' }}>

                        <TouchableOpacity onPress={() => setViewNewBike(true)}>
                            <MaterialIcons name='add'
                                size={28}
                                color={'#f1f1f1'}
                                marginRight={15}
                            />
                        </TouchableOpacity>
                    </View>

                )
            })
        }
    }, [viewNewBike])



    return (
        <View style={styles.container} >
            {viewNewBike ?
                <AddBike onSaveBike={setViewNewBike} /> :
                <BikesList bikes={allBikesCont} />}
        </View>
    )
}


const size = 80
const padding = 16

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 15
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


