import { FlatList, StyleSheet, View } from "react-native"
import Bike from "./Bike"

const BikesList = ({ bikes, navigation }) => {

    const separator = () => <View style={styles.separator} />

    return (
        <FlatList
            data={bikes}
            renderItem={({ item }) => (
                <Bike {...item}
                    onPress={() => navigation.navigate('BikeDetail', { ...item })} />
            )}
            keyExtractor={(item) => item.id}
            ItemSeparatorComponent={separator}
        />
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
        backgroundColor: '#999'
    }
})

export default BikesList