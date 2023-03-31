import { View, Text } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'

const SplashScreen = () => {
    const navigation = useNavigation()

    setTimeout(async () => {
        if (await AsyncStorage.getItem('USER_SIGNED') === 'true') {
            navigation.navigate('Home')
        } else {
            navigation.navigate('Login')
        }
    }, 1000)

    return (
        <View>
            <Text>SplashScreen</Text>
        </View>
    )
}

export default SplashScreen