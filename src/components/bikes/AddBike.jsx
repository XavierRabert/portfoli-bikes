import { useEffect, useState } from "react";
import { StyleSheet, Text, TextInput, View, ScrollView, Image, TouchableOpacity } from "react-native"

import { app, database } from '../../config/firebase'
import { collection, addDoc } from "firebase/firestore";

import Button from "../common/Button";
import MyCamera from "../common/MyCamera";
import { getAuth } from "firebase/auth";
import MyImagePicker from "../common/MyImagePicker";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from '@expo/vector-icons'


const AddBike = ({ onSaveBike }) => {

    const navigation = useNavigation()

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [brand, setBrand] = useState('')
    const [model, setModel] = useState('')
    const [image, setImage] = useState('')
    const [showCamera, setShowCamera] = useState(false)

    const user = getAuth(app)

    // Afegeix Opcions de menu
    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <View style={{ flexDirection: 'row' }}>
                    < TouchableOpacity onPress={() => onSend()}  >
                        <MaterialIcons name='check'
                            size={28}
                            color={'#f1f1f1'}
                            marginRight={15}
                        />
                    </TouchableOpacity >
                    < TouchableOpacity onPress={() => onSaveBike(false)}  >
                        <MaterialIcons name='close'
                            size={28}
                            color={'#f1f1f1'}
                            marginRight={15}
                        />
                    </TouchableOpacity >
                </View>
            )
        })

    }, [navigation, name, description, brand, model, image])

    // Guarda la nova bici
    const onSend = async () => {
        const newBike = {
            "id": generateUniqueId(),
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

    // Recull la imatge
    onTakePicture = (value) => {
        setImage(value)
    }

    // Genera un id unic
    generateUniqueId = () => {
        return Math.random().toString(30).substring(2);
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

                    <MyImagePicker
                        image={image}
                        onSetImage={setImage}
                    />

                    <Button title='Image' icon="photo-camera" onPress={() => setShowCamera(true)} />

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