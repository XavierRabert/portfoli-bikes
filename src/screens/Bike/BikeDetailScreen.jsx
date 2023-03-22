import { useRoute } from "@react-navigation/native";
import { useState } from "react";
import { Text } from "react-native"

const BikeDetailScreen = () => {

    const route = useRoute()

    const [bike, setBike] = useState(route.params)

    console.log(route.params)


    return (
        <Text>{bike.name}</Text>
    )
}

export default BikeDetailScreen