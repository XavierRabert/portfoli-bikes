import { collection, onSnapshot, query } from 'firebase/firestore'
import { useContext, useEffect, useState } from 'react'
import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity, TextInput } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import { database } from '../../config/firebase'
import colors from '../../common/colors'
import BikeContext from '../../context/bikeContext'
import { Picker } from '@react-native-picker/picker'
import Button from '../../components/common/Button'

const getFilePath = (file) => {
    const images = {
        'Chain': require('../../images/logo/chain.png'),
        'Fork': require('../../images/logo/fork.png'),
        'Disk Brakes': require('../../images/logo/disc-brake.png'),
    }

    if (file === '') {
        return { uri: 'https://via.placeholder.com/200' }
    }
    return images[file]
}

const AddMaintenancePart = ({ part, onFinish }) => {

    const { allBikesCont } = useContext(BikeContext)
    const [selectedBike, setSelectedBike] = useState()
    const [description, setDescription] = useState('')
    const [km, setkm] = useState(0)
    console.log(part)

    return (
        <View style={styles.container}>
            <View style={styles.btnContainer}>
                <Button
                    title={'Save'}
                    onPress={() => onFinish(true)}
                    icon={'check'}
                    color='green'
                />
                <Button
                    title={'Cancel'}
                    onPress={() => onFinish(true)}
                    icon={'close'}
                    color='red'
                />
            </View>
            {/* <View style={styles.container_col}> */}
            <View style={styles.container_part_add}>
                <Image style={styles.image} source={getFilePath(part.name)} />
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
                    onChangeText={(text) => setkm({ text })}
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
                        onChangeText={(text) => setDescription({ text })}
                    />
                </View>

            </View>
        </View>
    )
}

const MaintenancesListScreen = () => {

    const [maintParts, setMaintParts] = useState([])
    const [viewParts, setViewParts] = useState(true)
    const [selectedPart, setSelectedPart] = useState('')

    useEffect(() => {

        const collectionRef = collection(database, `maint_parts`)
        const q = query(collectionRef)
        const unsuscribe = onSnapshot(q, querySnapshot => {
            setMaintParts(
                querySnapshot.docs.map(maintPart => ({
                    id: maintPart.id,
                    name: maintPart.data().name,
                    desc: maintPart.data().desc,
                    logo: maintPart.data().logo,
                }))
            )
        })
        return unsuscribe;
    }, [])

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
                                <Image style={styles.image} source={getFilePath(item.name)} />
                                <Text style={styles.name}>{item.name}</Text>
                            </View>
                        </TouchableOpacity >
                    )}
                    keyExtractor={(item) => item.id}
                    numColumns={2}
                // columnWrapperStyle={styles.row}
                //ItemSeparatorComponent={separator}
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
        _flex: 1,
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
        margin: 10,
        width: width - 20,
        height: 120,
        fontSize: 15,
        justifyContent: 'flex-start',
    },
    labelItem: {
        margin: 10,
    }
})
export default MaintenancesListScreen