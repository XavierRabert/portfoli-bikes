import { Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { MaterialIcons } from '@expo/vector-icons'

const Button = ({ title, onPress, icon, color }) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.button}>
            <MaterialIcons name={icon} size={28} color={color ? color : '#f1f1f1'} />
            <Text style={styles.text}>{title}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        height: 60,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 5,
        margin: 10
    },
    text: {
        color: '#f1f1f1',
        fontWeight: 'bold',
        fontSize: 16,
        marginLeft: 15
    }
})
export default Button