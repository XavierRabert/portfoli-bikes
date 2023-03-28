import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import colors from '../../common/colors'
import { TouchableOpacity } from 'react-native-gesture-handler'

const MenuUserOption = (props) => {
    const { displayName, photoURL, onPress, email } = props
    console.log('props: ', props)
    return (
        <TouchableOpacity onPress={onPress} style={styles.container}>
            <Image style={styles.image} source={photoURL === '' || !photoURL ? { uri: 'https://via.placeholder.com/200' } : { uri: photoURL }} />
            <Text style={styles.text}>{displayName ? displayName : email}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 15,
        padding: 15,
        backgroundColor: colors.menu,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center'
    },
    image: {
        height: 50,
        width: 50,
        borderRadius: 25,
        marginRight: 15,
        backgroundColor: 'red'
    },
    text: {
        fontSize: 18,
    }
})

export default MenuUserOption