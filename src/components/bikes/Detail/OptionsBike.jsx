import { TouchableOpacity, View, Text, StyleSheet } from "react-native"

const OptionsBike = () => {
    return (

        <View style={styles.container}>
            <TouchableOpacity style={styles.buttonContent}>
                <Text style={styles.buttonText}>Update</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonContent}>
                <Text style={styles.buttonText}>Delete</Text>
            </TouchableOpacity>
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonContent: {
        backgroundColor: 'green',
        padding: 15,
        margin: 15,
        borderRadius: 5
    },
    buttonText: {
        color: '#fff',
        fontSize: 15
    }
})

export default OptionsBike