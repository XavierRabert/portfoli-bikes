import { Text, View } from "react-native"

const BikeDetail = ({ name, desc, brand, model, image, createdAt }) => {
    return (
        <View>
            <Text>{name}</Text>
            <Text>{desc}</Text>
            <Text>{brand}</Text>
            <Text>{model}</Text>
            <Text>{createdAt}</Text>
        </View>
    )
}

export default BikeDetail