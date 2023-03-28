import { View, Text, StyleSheet, Alert, TextInput, TouchableOpacity } from 'react-native'
import { getAuth, updateProfile, updatePassword } from 'firebase/auth'

import { useEffect, useState } from 'react'
import colors from '../common/colors';
import { useNavigation } from '@react-navigation/native';
import Button from '../components/common/Button';
import MyImagePicker from '../components/common/MyImagePicker';
import { MaterialIcons } from '@expo/vector-icons'
import { app } from '../config/firebase';

const UserScreen = () => {

    const navigation = useNavigation()

    const user = getAuth()

    const [image, setImage] = useState(user.currentUser ? user.currentUser.photoURL : null);
    const [userName, setUserName] = useState(user.currentUser ? user.currentUser.displayName : null)
    const [userEmail, setUserEmail] = useState(user.currentUser ? user.currentUser.email : null)



    useEffect(() => {
        const uploadImage = async () => {
            if (image) {
                updateProfile(user.currentUser, {
                    displayName: userName,
                    photoURL: image
                }).then(() => {
                    //Alert.alert("Photo Updated")
                }).catch((error) => {
                    Alert.alert(error.message)
                });

            }
        }
        uploadImage()
    }, [image, userName])

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity onPress={HandleLogOut}>
                    <MaterialIcons name='logout'
                        size={28}
                        color={'#f1f1f1'}
                        marginRight={15}
                    />
                </TouchableOpacity>
            )
        })

    }, [])


    function HandleLogOut() {
        const auth = getAuth(app)
        auth.signOut()
            .then(() => console.log('User signed out!'));
        navigation.navigate('Login')
    }


    return (
        <View style={styles.container}>

            <MyImagePicker
                image={image}
                onSetImage={setImage} />

            <View>
                <View style={styles.labelContainer}>
                    <Text style={styles.labelText}>User Name: </Text>
                    <TextInput
                        onChangeText={(value) => setUserName(value)}
                        value={userName}
                        style={styles.inputText}
                    />
                </View>

                <View style={styles.labelContainer}>
                    <Text style={styles.labelText}>Email: </Text>
                    <TextInput
                        onChange={(value) => setUserEmail(value)}
                        value={userEmail}
                        style={styles.inputText}
                    />
                </View>
            </View>
            {/* <Button
                title="LogOut"
                onPress={() => navigation.navigate('Logout')}
            /> */}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        _alignItems: 'center'
    },
    image: {
        height: 200,
        width: 200,
        borderRadius: 100,
        margin: 15,
        alignSelf: 'center'
    },
    labelContainer: {
        flexDirection: 'column',
        padding: 10,
        _alignItems: 'flex-start'
    },
    labelText: {
        fontSize: 18
    },
    inputText: {
        backgroundColor: colors.menu,
        height: 50,
        paddingHorizontal: 20,
        fontSize: 20
    }
})

export default UserScreen