import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Modal, Dimensions, TextInput } from "react-native"
import { MaterialIcons } from '@expo/vector-icons'
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { database } from "../../config/firebase";
import { getAuth } from "firebase/auth";
import colors from "../../common/colors";
import MyImagePicker from "../../components/common/MyImagePicker";


const BikeDetail = ({ id, name, desc, brand, model, image }) => {

    const navigation = useNavigation()
    const [modalVisible, setModalVisible] = useState(false)
    const [editMode, setEditMode] = useState(false)
    const [nameBike, setNameBike] = useState(name)
    const [descBike, setDescBike] = useState(desc)
    const [brandBike, setBrandBike] = useState(brand)
    const [modelBike, setModelBike] = useState(model)
    const [imageBike, setImageBike] = useState(image)

    const user = getAuth()

    // Guarda dades inicials     
    useEffect(() => {
        setEditMode(false)
        setNameBike(name);
        setDescBike(desc);
        setBrandBike(brand);
        setModelBike(model);
        setImageBike(image)
    }, [id])

    // Modifica opcions de menú
    useEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <TouchableOpacity onPress={() => navigation.navigate('BikesList')}>
                    <MaterialIcons name='arrow-back'
                        size={28}
                        color={'#f1f1f1'}
                        marginHorizontal={15}
                    />
                </TouchableOpacity>
            ),
            headerRight: () => (
                <View style={{ flexDirection: 'row' }}>
                    {!editMode ?
                        <TouchableOpacity
                            onPress={() => setModalVisible(true)}>
                            <MaterialIcons name='delete'
                                size={28}
                                color={'#f1f1f1'}
                                marginHorizontal={10}
                            />
                        </TouchableOpacity>
                        :
                        <TouchableOpacity
                            onPress={onCancelEdit}>
                            <MaterialIcons name='close'
                                size={28}
                                color={'#f1f1f1'}
                                marginHorizontal={10}
                            />
                        </TouchableOpacity>
                    }
                    <TouchableOpacity onPress={editMode ? onSave : () => setEditMode(true)}>
                        <MaterialIcons name={editMode ? 'check' : 'edit'}
                            size={28}
                            color={'#f1f1f1'}
                            marginHorizontal={10}
                        />
                    </TouchableOpacity>
                </View >
            )
        })
    }, [nameBike, brandBike, modelBike, descBike, imageBike])

    // Guarda les dades
    const onSave = async () => {
        const bikeRef = doc(database, `bikes-${user.currentUser.uid}`, id);
        await updateDoc(bikeRef, {
            name: nameBike,
            brand: brandBike,
            model: modelBike,
            desc: descBike,
            image: imageBike,
        });
        setEditMode(false)
    }


    // Cancela les modificacions
    const onCancelEdit = () => {
        setEditMode(false)
        setNameBike(name);
        setDescBike(desc);
        setBrandBike(brand);
        setModelBike(model);
        setImageBike(image)
    }

    // Elimina el registre
    onDeleteBike = async () => {

        await deleteDoc(doc(database, `bikes-${user.currentUser.uid}`, id));
        setModalVisible(false)
        navigation.navigate('BikesList')
    }



    return (
        <View style={styles.container}>
            <MyImagePicker
                image={imageBike}
                onSetImage={setImageBike}
            />
            <View>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                >
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Are you sure you want to delete this bike?</Text>
                        <View style={styles.modalBtnContainer}>
                            <TouchableOpacity onPress={onDeleteBike} style={styles.modalBtnYes}>
                                <Text style={styles.modalTextBtn}>Yes</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.modalBtnNo}>
                                <Text style={styles.modalTextBtn}>No</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>

                <View>
                    <View style={styles.labelContainer}>
                        <Text style={styles.labelText}>Name: </Text>
                        <TextInput
                            onChangeText={(value) => setNameBike(value)}
                            value={nameBike}
                            style={styles.inputText}
                            editable={editMode}
                        />
                    </View>

                    <View style={styles.labelContainer}>
                        <Text style={styles.labelText}>Description: </Text>
                        <TextInput
                            onChangeText={(value) => setDescBike(value)}
                            value={descBike}
                            style={styles.inputText}
                            editable={editMode}
                        />
                    </View>

                    <View style={styles.labelContainer}>
                        <Text style={styles.labelText}>Brand: </Text>
                        <TextInput
                            onChangeText={(value) => setBrandBike(value)}
                            value={brandBike}
                            style={styles.inputText}
                            editable={editMode}
                        />
                    </View>

                    <View style={styles.labelContainer}>
                        <Text style={styles.labelText}>Model: </Text>
                        <TextInput
                            onChangeText={(value) => setModelBike(value)}
                            value={modelBike}
                            style={styles.inputText}
                            editable={editMode}
                        />
                    </View>
                </View>

            </View>
        </View>
    )
}

const BikeDetailScreen = ({ route }) => {

    return (
        <View style={styles.container}>
            <BikeDetail {...route.params} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    image: {
        width: 150,
        height: 150,
        borderRadius: 75,
        alignSelf: 'center',
        margin: 15
    },
    containerOptions: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalView: {
        position: 'relative',
        top: (Dimensions.get("window").height / 2) - (Dimensions.get("window").width / 2),
        alignSelf: 'center',
        backgroundColor: colors.box,
        borderColor: colors.border,
        borderWidth: 5,
        borderRadius: 5,
        alignItems: 'center',
        padding: 50
    },
    modalText: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    modalBtnContainer: {
        flexDirection: 'row',
        marginVertical: 20
    },
    modalTextBtn: {
        color: '#f1f1f1',
        fontSize: 18
    },
    modalBtnNo: {
        width: 70,
        paddingVertical: 15,
        backgroundColor: 'red',
        borderRadius: 5,
        alignItems: 'center',
        margin: 10
    },
    modalBtnYes: {
        width: 70,
        paddingVertical: 15,
        backgroundColor: 'green',
        borderRadius: 5,
        alignItems: 'center',
        margin: 10
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
export default BikeDetailScreen