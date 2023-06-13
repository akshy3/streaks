import AsyncStorage from "@react-native-async-storage/async-storage";
import { Button, StyleSheet, Text, View } from "react-native";

export default function ActivityScreen({route,navigation}){
    const {id,activities} = route.params;
    var activity = activities.find(item=>item.id==id);
    let date= new Date(activity.date)
    const handeDelete=async()=>{
        let data=activities.filter(item=>item.id!==id)
        data=await JSON.stringify(data)
        await AsyncStorage.setItem('@activities',data)
        navigation.navigate('Home')
    }

    return(
        <View  style={styles.container}>
            <Text style={styles.text}>{activity.title}</Text>
            <Text style={styles.text}>{date.toDateString()}</Text>
            <Button onPress={handeDelete} title="Delete this activity"/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'black',
        flex:1,
    },
    text: {
        color: 'white',
    }
})