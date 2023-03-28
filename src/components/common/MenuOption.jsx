import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import colors from '../../common/colors'

const MenuOption = ({ text, onPress }) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.container}>
            <Text style={styles.text}>{text}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 15,
        padding: 15,
        backgroundColor: colors.menu,
        borderRadius: 10
    },
    text: {
        fontSize: 18,
    }
})

export default MenuOption