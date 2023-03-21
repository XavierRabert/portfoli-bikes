import { useEffect, useState } from "react"
import { FlatList, StyleSheet, Text, View } from "react-native"
import Bike from "../components/bike"
import bikesData from "../data/bikes.json"

const BikesListScreen = ({ navigation }) => {

    const [bikes, setBikes] = useState([])

    const separator = () => <View style={styles.separator} />

    useEffect(() => {
        const fetchData = async () => {
            // const response = await fetch('src/data/bikes.json')
            // console.log(response)
            // const data = await response.json()
            // console.log(data)
            setBikes(bikesData.bikes)
            console.log(bikesData.bikes.length)
            console.log(bikes)
        }

        fetchData()
    }, [])

    if (bikes.length === 0) return (
        <View >
            <Text >Nothing to see here {bikes.length}</Text>
        </View>)

    return (
        <FlatList
            data={bikes}
            renderItem={({ item }) => (
                <Bike
                    id={item.id}
                    name={item.name}
                    desc={item.desc}
                    image={item.image}
                    onPress={() => navigation.navigate('BikeDetail', { id: item.id, name: item.name })} />


            )}
            keyExtractor={(item) => item.id}
            ItemSeparatorComponent={separator} />


    )
}

const styles = StyleSheet.create({
    separator: {
        height: 5,
        left: 16,
        backgroundColor: 'red',
        margin: 5
    },
    container: {
        flex: 1,
        backgroundColor: '#666'
    }
})

export default BikesListScreen