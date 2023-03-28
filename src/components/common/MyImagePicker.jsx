import { TouchableOpacity, Image, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import * as ImagePicker from 'expo-image-picker';


const MyImagePicker = ({ onSetImage, image }) => {
    const [hasGalleryPermissions, setHasGalleryPermissions] = useState(null)
    //const [image, setImage] = useState('');

    useEffect(() => {
        (async () => {
            const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync()
            setHasGalleryPermissions(galleryStatus.status === 'granted')
        })()
    }, [])

    const pickImage = async () => {

        if (hasGalleryPermissions) {
            let resultImage = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 4],
                quality: 1
            })

            if (!resultImage.canceled) {
                onSetImage(resultImage.assets[0].uri);
            }
        }
        else {
            Alert.alert('No Has Gallery Permissions')
        }
    }


    return (
        <TouchableOpacity onPress={pickImage}>
            <Image style={styles.image}
                source={image === '' || !image ?
                    { uri: 'https://via.placeholder.com/200' } : { uri: image }}
            />
        </TouchableOpacity>
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
})
export default MyImagePicker