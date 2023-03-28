import { View, Text, StyleSheet, Image } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { Camera } from "expo-camera";
import * as MediaLibrary from 'expo-media-library'
import Button from "./Button";



const MyCamera = ({ onSave, onTakePicture }) => {

    const [image, setImage] = useState(null)
    const [hasCameraPermissions, setHasCameraPermissions] = useState(null)
    const [type, setType] = useState(Camera.Constants.Type.back)
    const [flash, setFlash] = useState(Camera.Constants.FlashMode.off)
    const cameraRef = useRef(null)

    // Permisos de la camera
    useEffect(() => {
        const permissions = async () => {
            MediaLibrary.requestPermissionsAsync();
            const cameraStatus = await Camera.requestCameraPermissionsAsync();
            setHasCameraPermissions(cameraStatus.status === 'granted')
        }

        permissions();
    }, [])

    const takePicture = async () => {
        if (cameraRef) {
            try {
                const data = await cameraRef.current.takePictureAsync()
                setImage(data.uri)
            }
            catch (e) {
                console.log('error', e)
            }
        }
    }

    const saveImage = async () => {
        if (image) {
            try {
                await MediaLibrary.createAssetAsync(image)
                onTakePicture(image)
                setImage(null)
                onSave()
            }
            catch (e) {
                console.log(e)
            }
        }
    }

    if (hasCameraPermissions === false) {
        return <Text>No acces to camera</Text>
    }

    return (
        <View style={styles.container}>
            {image ?
                <Image source={{ uri: image }} style={styles.camera} />
                :
                < Camera
                    style={styles.camera}
                    type={type}
                    FlashMode={flash}
                    ref={cameraRef}
                    autoFocus={Camera.Constants.AutoFocus.off}
                ></Camera>
            }
            <View>
                {image ?
                    <View style={styles.btnContainer}>
                        <Button
                            title={'Re-take'}
                            icon="autorenew"
                            onPress={() => setImage(null)}
                        />
                        <Button
                            title={'Save'}
                            icon="check"
                            onPress={saveImage}
                        />
                    </View>
                    :
                    <View>
                        <Button
                            title={'Take a picture'}
                            icon="photo-camera"
                            onPress={takePicture}
                        />
                    </View>
                }
            </View>
        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    camera: {
        flex: 1,
        margin: 10,
        borderRadius: 25
    },
    btnContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 50
    }
})

export default MyCamera