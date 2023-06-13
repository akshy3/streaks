import { StyleSheet, Text } from "react-native";

export default function ActivityScreen({route}){
    const {id} = route.params;
    return(
        <Text style={styles.container}>{id}</Text>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'black',
        color: 'white',
    }
})