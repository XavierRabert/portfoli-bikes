import { addDoc, collection, onSnapshot, query } from 'firebase/firestore'
import { useContext, useEffect, useLayoutEffect, useState } from 'react'
import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity, TextInput } from 'react-native'
import { FlatList, ScrollView } from 'react-native-gesture-handler'
import { app, database } from '../../config/firebase'
import colors from '../../common/colors'
import BikeContext from '../../context/bikeContext'
import { Picker } from '@react-native-picker/picker'
import { getAuth } from 'firebase/auth'
import { PARTS } from '../../data/maintenanceParts'
import { useNavigation } from '@react-navigation/native'
import { MaterialIcons } from '@expo/vector-icons'


const AddMaintenancePart = ({ part, onFinish }) => {

    const [selectedBike, setSelectedBike] = useState('')
    const [description, setDescription] = useState('')
    const [km, setkm] = useState('')
    const user = getAuth(app)
    const navigation = useNavigation()


    const { allBikesCont } = useContext(BikeContext)

    // Carrega Opcions de menu
    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <View style={{ flexDirection: 'row' }}>
                    < TouchableOpacity onPress={onAddButton}  >
                        <MaterialIcons name='check'
                            size={28}
                            color={'#f1f1f1'}
                            marginRight={15}
                        />
                    </TouchableOpacity >
                    < TouchableOpacity onPress={() => onFinish(true)}  >
                        <MaterialIcons name='close'
                            size={28}
                            color={'#f1f1f1'}
                            marginRight={15}
                        />
                    </TouchableOpacity >
                </View>
            )
        })

    }, [selectedBike, description, km, navigation])

    // Genera codi unic
    generateUniqueId = () => {
        return Math.random().toString(30).substring(2);
    }

    // Afegeix el register a la BBDD
    const onAddButton = async () => {
        const newMant = {
            "id": generateUniqueId(),
            "bike_id": selectedBike,
            "part_id": part.slug,
            "desc": description,
            "km": km,
            "createdAt": new Date()
        }

        await addDoc(collection(database, `maintenance-${user.currentUser.uid}`), newMant)
        onFinish(true)
    }


    return (
        <ScrollView style={styles.container}>

            <View style={styles.container_part_add}>
                <Image style={styles.image} source={part.logo} />
                <Text style={styles.name}>{part.name}</Text>
            </View>
            {/* </View> */}
            <View style={styles.labelItem}>
                <Text>Select a Bike: </Text>
                <Picker
                    selectedValue={selectedBike}
                    style={styles.listPicker}
                    onValueChange={(itemValue) => setSelectedBike(itemValue)}
                >
                    <Picker.Item label="Select a Bike" value='' />
                    {allBikesCont.map((bike) => (
                        <Picker.Item key={bike.id} label={bike.name} value={bike.id} />
                    ))}

                </Picker>
            </View>
            <View style={styles.labelItem}>
                <Text>Enter a Bike Km: </Text>
                <TextInput
                    style={styles.textInput}
                    placeholder='Km'
                    placeholderTextColor="grey"
                    value={km}
                    onChangeText={(text) => setkm(text)}
                    keyboardType='numeric'
                />
            </View>
            <View style={styles.labelItem}>
                <Text>Description: </Text>
                <View style={styles.textAreaContainer} >
                    <TextInput
                        style={styles.textArea}
                        placeholder="Type something"
                        placeholderTextColor="grey"
                        numberOfLines={5}
                        multiline={true}
                        value={description}
                        onChangeText={(text) => setDescription(text)}
                    />
                </View>

            </View>
        </ScrollView>
    )
}

const MaintenancesListScreen = () => {

    const [maintParts, setMaintParts] = useState([])
    const [viewParts, setViewParts] = useState(true)
    const [selectedPart, setSelectedPart] = useState('')

    const navigation = useNavigation()


    // Llegeix el llistat de bicis
    useEffect(() => {

        // const collectionRef = collection(database, `maint_parts`)
        // const q = query(collectionRef)
        // const unsuscribe = onSnapshot(q, querySnapshot => {
        //     setMaintParts(
        //         querySnapshot.docs.map(maintPart => ({
        //             id: maintPart.id,
        //             name: maintPart.data().name,
        //             desc: maintPart.data().desc,
        //             logo: maintPart.data().logo,
        //         }))
        //     )
        // })
        // return unsuscribe;


        setMaintParts(PARTS)
        console.log(maintParts)

    }, [])

    // Carrega Opcions de menu
    useEffect(() => {
        if (viewParts) {
            navigation.setOptions({
                headerRight: () => (
                    <View style={{ flexDirection: 'row' }}>

                    </View>
                )
            })
        }
    }, [viewParts])

    // Canvia d epagina a Add
    const onSelectPart = (item) => {
        setSelectedPart(item)
        setViewParts(false)
    }

    return (
        <View style={styles.container}>
            {viewParts ?
                <FlatList
                    data={maintParts}
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => onSelectPart(item)} >
                            <View style={styles.container_part}>
                                {item.logo ?
                                    <Image style={styles.image} source={item.logo} />
                                    : <></>
                                }
                                <Text style={styles.name}>{item.name}</Text>
                            </View>
                        </TouchableOpacity >
                    )}
                    keyExtractor={(item) => item.name}
                    numColumns={2}
                />
                :
                <AddMaintenancePart part={selectedPart} onFinish={setViewParts} />
            }

        </View>
    )
}

const { width } = Dimensions.get("window")
const column = 2
const margin = 10
const SIZE = (width - (margin * column)) / column

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    container_col: {
        flexDirection: 'column',
        alignItems: 'center',
    },
    container_part: {
        borderColor: colors.border,
        borderStyle: 'solid',
        borderWidth: 2,
        borderRadius: 10,
        backgroundColor: colors.box,
        margin: 5,
        padding: 5,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-around',
        width: SIZE,
        height: SIZE
    },
    container_part_add: {
        borderColor: colors.border,
        borderStyle: 'solid',
        borderWidth: 2,
        borderRadius: 10,
        backgroundColor: colors.box,
        margin: 10,
        padding: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    btnContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 50
    },
    image: {
        height: 100,
        width: 100,
        marginHorizontal: 20
    },
    name: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#DF2E38'
    },
    listPicker: {
        height: 50,
        width: width - 40,
        margin: 10,
        backgroundColor: '#ccc'
    },
    textInput: {
        height: 50,
        width: width - 40,
        margin: 10,
        backgroundColor: '#ccc',
        paddingHorizontal: 10
    },
    textAreaContainer: {
        borderColor: colors.border,
        borderWidth: 1,
        padding: 5,
        margin: 10,
    },
    textArea: {
        margin: 5,
        height: 120,
        fontSize: 15
    },
    labelItem: {
        margin: 10,
    }
})
export default MaintenancesListScreen