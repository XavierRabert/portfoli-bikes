import { View, Text, Image, StyleSheet, Alert, TextInput } from 'react-native'
import { getAuth, updateProfile, updatePassword } from 'firebase/auth'
import * as ImagePicker from 'expo-image-picker';

import { useEffect, useState } from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler';
import colors from '../common/colors';
import { useNavigation } from '@react-navigation/native';
import Button from '../components/common/Button';

const UserScreen = () => {

    const navigation = useNavigation()

    const user = getAuth()

    const [image, setImage] = useState(user.currentUser ? user.currentUser.photoURL : null);
    const [hasGalleryPermissions, setHasGalleryPermissions] = useState(null)
    const [userName, setUserName] = useState(user.currentUser ? user.currentUser.displayName : null)
    const [userEmail, setUserEmail] = useState(user.currentUser ? user.currentUser.email : null)

    useEffect(() => {
        (async () => {
            const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync()
            setHasGalleryPermissions(galleryStatus.status === 'granted')
        })()
    }, [image])


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

    const pickImage = async () => {

        if (hasGalleryPermissions) {
            let resultImage = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 4],
                quality: 1
            })

            if (!resultImage.canceled) {
                setImage(resultImage.assets[0].uri);
            }
        }
        else {
            Alert.alert('No Has Gallery Permissions')
        }
    }


    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={pickImage}>
                <Image style={styles.image}
                    source={image === '' || !image ?
                        { uri: 'https://via.placeholder.com/200' } : { uri: image }}
                />
            </TouchableOpacity>
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
            <Button
                title="LogOut"
                onPress={() => navigation.navigate('Logout')}
            />
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