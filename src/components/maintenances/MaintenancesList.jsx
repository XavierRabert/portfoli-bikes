import { View, Text, StyleSheet, FlatList, Image, ScrollView } from 'react-native'
import React, { useContext, useState } from 'react'
import colors from '../../common/colors'
import BikeContext from '../../context/bikeContext'
import { PARTS } from '../../data/maintenanceParts'
import moment from 'moment/moment'

const MaintenancesList = ({ maintenances }) => {

    console.log('adfs', maintenances)

    const { allBikesCont } = useContext(BikeContext)
    return (
        <View style={styles.container}>
            <FlatList
                data={maintenances}
                renderItem={({ item }) => (
                    // <Pressable onPress={() => navigation.navigate('BikeDetail', { ...item })} >
                    <View style={styles.container_maint}>
                        <Image style={styles.image}
                            source={PARTS.find(part => part.slug === item.part_id).logo} />
                        <Text style={styles.name}>{allBikesCont.find(bike => bike.id === item.bike_id).name}</Text>
                        <View style={{ marginHorizontal: 10 }}>
                            <Text style={styles.description}>{item.desc.substr(0, 20)}</Text>
                            <Text style={styles.description}>KM: {item.km}</Text>
                            <Text style={styles.description}>{moment.utc(item.createdAt.seconds * 1000).format("DD-MM-YYYY")}</Text>
                        </View>
                    </View>
                    // </Pressable>
                )}
                keyExtractor={(item) => item.id}
            />

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 15
    },
    container_maint: {
        _flex: 1,
        flexDirection: 'row',
        padding: 15,
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: colors.box,
        borderColor: colors.border,
        borderStyle: 'solid',
        borderWidth: 2,
        borderRadius: 5,
        margin: 5
    },
    image: {
        height: 30,
        width: 30,
        marginHorizontal: 15
    },
    name: {
        fontSize: 18,
        fontWeight: "bold",
        marginHorizontal: 15
    },
    description: {
        fontSize: 12,
        marginLeft: 5
    },
})
export default MaintenancesList