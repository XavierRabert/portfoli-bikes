import { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"

import { database } from '../../../config/firebase'
import { collection, addDoc } from "firebase/firestore";


const AddBike = ({ onSaveBike }) => {

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [brand, setBrand] = useState('')
    const [model, setModel] = useState('')

    const onSend = async () => {
        const newBike = {
            "id": 9, //Math.max(bikes.filter(x => x.id)) + 1,
            "name": name,
            "brand": brand,
            "model": model,
            "desc": description,
            "image": "",
            "createdAt": new Date()
        }

        await addDoc(collection(database, 'bikes'), newBike);
        onSaveBike(false)
    }
    return (
        <View style={styles.container}>
            <View>
                <Text>Bike Name</Text>
            </View>
            <View style={styles.contentInput} >
                <TextInput
                    placeholder="Bike Name"
                    onChangeText={(value) => setName(value)}
                    value={name}
                />
            </View>

            <View>
                <Text>Description</Text>
            </View>
            <View style={styles.contentInput} >
                <TextInput
                    placeholder="Description"
                    onChangeText={(value) => setDescription(value)}
                    value={description}
                />
            </View>

            <View>
                <Text>Brand</Text>
            </View>
            <View style={styles.contentInput} >
                <TextInput
                    placeholder="Brand"
                    onChangeText={(value) => setBrand(value)}
                    value={brand}
                />
            </View>

            <View>
                <Text>Model</Text>
            </View>
            <View style={styles.contentInput} >
                <TextInput
                    placeholder="Model"
                    onChangeText={(value) => setModel(value)}
                    value={model}
                />
            </View>

            <View>
                <TouchableOpacity onPress={onSend} style={styles.btnContainer}>
                    <Text style={styles.btnText}>Guardar</Text>
                </TouchableOpacity>
            </View>


        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center'
    },
    contentInput: {
        backgroundColor: '#fff',
        margin: 10,
        width: '90%',
        height: 35,
        borderRadius: 3,
        borderColor: "#222",
        justifyContent: 'center',
        paddingLeft: 15
    },
    btnContainer: {
        backgroundColor: "blue",
        padding: 15,
        borderRadius: 10
    },
    btnText: {
        color: '#fff'
    }
})

export default AddBike