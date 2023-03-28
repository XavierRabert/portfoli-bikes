import { useNavigation } from "@react-navigation/native";
import { useContext, useEffect } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native"
import Button from "../../components/common/Button";
import BikeContext from "../../context/bikeContext";
import { MaterialIcons } from '@expo/vector-icons'

const BikeDetail = ({ name, desc, brand, model, image, createdAt }) => {
    const navigation = useNavigation()

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity onPress={() => navigation.navigate('BikesList')}>
                    <MaterialIcons name='arrow-back'
                        size={28}
                        color={'#f1f1f1'}
                        marginRight={15}
                    />
                </TouchableOpacity>
            )
        })

    }, [])


    return (
        <View style={styles.containerDetails}>
            <Image style={styles.image} source={image === '' ? { uri: 'https://via.placeholder.com/200' } : { uri: image }} />
            <View>
                <Text>Name: {name}</Text>
                <Text>Description: {desc}</Text>
                <Text>Brand: {brand}</Text>
                <Text>Model: {model}</Text>
                <Text>Created At: {createdAt}</Text>
            </View>
        </View>
    )
}


const OptionsBike = () => {

    const navigation = useNavigation();
    const { bikeCont, setBikeCont } = useContext(BikeContext)

    onDeleteBike = async () => {
        await deleteDoc(doc(database, 'bikes', bikeCont.id));
        setBikeCont('')
        navigation.goBack()
    }

    return (
        <View style={styles.containerOptions}>
            <Button title='Edit' icon="edit" color='green' />
            <Button title='Delete' icon="delete" color='red' onPress={onDeleteBike} />
        </View>
    )
}

const BikeDetailScreen = ({ route }) => {

    return (
        <View style={styles.container}>
            <OptionsBike />
            <BikeDetail {...route.params} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    containerDetails: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        gap: 25,
        alignItems: 'center',
        padding: 10
    },
    image: {
        width: 150,
        height: 150,
        borderRadius: 15
    },
    containerOptions: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    }
})
export default BikeDetailScreen