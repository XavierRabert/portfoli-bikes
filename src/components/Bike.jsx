import { Image, Pressable, StyleSheet, Text, View } from "react-native"

const Bike = ({ name, desc, image, onPress }) => {
    return (
        <Pressable onPress={onPress}>
            <View styles={styles.container}>
                <Image styles={styles.image} source={{ uri: image }} />
                <View>
                    <Text styles={styles.name}>{name}</Text>
                    <Text styles={styles.description}>{desc}</Text>
                </View>
            </View>
        </Pressable>
    )
}


const size = 100
const padding = 16

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        height: size,
        paddingLeft: padding,
        alignItems: 'center',
    },
    image: {
        height: size - padding,
        width: size - padding,
        borderRadius: (size - padding) / 2,
        marginRight: padding,
    },
    name: {
        fontSize: 18,
        fontWeight: '700',
    },
    description: {
        fontSize: 12,
    },
})


export default Bike