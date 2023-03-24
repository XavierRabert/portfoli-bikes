import { useState } from "react";
import { StyleSheet, Text, TextInput, View, ScrollView, Image } from "react-native"

import { app, database } from '../../config/firebase'
import { collection, addDoc } from "firebase/firestore";

import Button from "../common/Button";
import MyCamera from "../common/MyCamera";
import { getAuth } from "firebase/auth";


const AddBike = ({ onSaveBike }) => {

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [brand, setBrand] = useState('')
    const [model, setModel] = useState('')
    const [image, setImage] = useState('')
    const [showCamera, setShowCamera] = useState(false)

    const user = getAuth(app)

    const onSend = async () => {
        const newBike = {
            "name": name,
            "brand": brand,
            "model": model,
            "desc": description,
            "image": image,
            "createdAt": new Date()
        }

        await addDoc(collection(database, `bikes-${user.currentUser.uid}`), newBike);
        onSaveBike(false)
    }

    onTakePicture = (value) => {
        setImage(value)
    }


    return (
        <View style={styles.container}>
            {showCamera === true ?
                <View style={styles.container}>
                    <MyCamera
                        onSave={() => setShowCamera(false)}
                        onTakePicture={onTakePicture} />
                </View>
                :
                <ScrollView style={styles.contentInput}>

                    <Text style={styles.lableText}>Bike Name</Text>
                    <TextInput
                        style={styles.textInput}
                        placeholder="Bike Name"
                        onChangeText={(value) => setName(value)}
                        value={name}
                    />

                    <Text style={styles.lableText}>Description</Text>
                    <TextInput
                        style={styles.textInput}
                        placeholder="Description"
                        onChangeText={(value) => setDescription(value)}
                        value={description}
                    />

                    <Text style={styles.lableText}>Brand</Text>
                    <TextInput
                        style={styles.textInput}
                        placeholder="Brand"
                        onChangeText={(value) => setBrand(value)}
                        value={brand}
                    />

                    <Text style={styles.lableText}>Model</Text>
                    <TextInput
                        style={styles.textInput}
                        placeholder="Model"
                        onChangeText={(value) => setModel(value)}
                        value={model}
                    />

                    <Image style={styles.image} source={image === '' ? { uri: 'https://via.placeholder.com/200' } : { uri: image }} />
                    <Button title='Image' icon="photo-camera" onPress={() => setShowCamera(true)} />
                    <Button title='Save' icon="check" onPress={onSend} />



                </ScrollView>
            }
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        _height: 200,
        flexDirection: 'column',
        _justifyContent: 'center'
    },
    textInput: {
        backgroundColor: '#fff',
        margin: 10,
        width: '90%',
        height: 35,
        borderRadius: 3,
        borderColor: "#222",
        justifyContent: 'center',
        paddingLeft: 15
    },
    lableText: {
        color: '#000',
        marginLeft: 10
    },
    image: {
        alignSelf: 'center',
        height: 100,
        width: 100,
        borderRadius: 50
    }
})

export default AddBike