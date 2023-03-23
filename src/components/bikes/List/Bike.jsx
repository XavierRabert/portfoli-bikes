import { Image, Pressable, StyleSheet, Text, View } from "react-native"

const Bike = ({ name, desc, image, onPress }) => {
    return (
        <Pressable onPress={onPress} >
            <View style={styles.container_bike}>
                <Image style={styles.image} source={image === '' ? { uri: 'https://via.placeholder.com/200' } : { uri: image }} />
                {/* <View style={styles.container_text}> */}
                <Text style={styles.name}>{name}</Text>
                <Text style={styles.description}>{desc}</Text>
                {/* </View> */}
            </View>
        </Pressable>
    )
}


const size = 80
const padding = 16

const styles = StyleSheet.create({
    container_bike: {
        flex: 1,
        flexDirection: 'row',
        height: size,
        paddingLeft: padding,
        alignItems: 'center',
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
        backgroundColor: 'red'
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


export default Bike