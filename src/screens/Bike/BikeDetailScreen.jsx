import { useRoute } from "@react-navigation/native";
import { useState } from "react";
import { Text, View } from "react-native"
import BikeDetail from "../../components/bikes/Detail/BikeDetail";
import OptionsBike from "../../components/bikes/Detail/OptionsBike";

const BikeDetailScreen = () => {

    const route = useRoute()

    const [bike, setBike] = useState(route.params)

    console.log(route.params)


    return (
        <View>
            <View>
                <OptionsBike />
            </View>
            <View>
                <BikeDetail {...route.params} />
            </View>
        </View>
    )
}

export default BikeDetailScreen