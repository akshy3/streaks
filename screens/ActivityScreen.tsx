import AsyncStorage from "@react-native-async-storage/async-storage";
import { Button, StyleSheet, Text, View } from "react-native";

export default function ActivityScreen(props: { route: any; navigation: any; }) {
    const { route, navigation, } = props
    const { id, activities } = route.params;
    var activity = activities.find((item: { id: any; }) => item.id == id);
    let date = new Date(activity.date)

    const DateDiff = (date1: number, date2: number): number => {
        let diff = Math.floor((date1 - date2) / 86400000);
        return diff;
    }
    const handleHistory = (arr: number[]) => {
        let res = [];
        for (let i = 0; i < arr.length; i++) {
            if (i == 0) {
                let diff = DateDiff(Date.now(), arr[i]);
                res.push(<Text>{diff} Days</Text>)

            }
            else {

                let diff = DateDiff(arr[i - 1], arr[i]);
                res.push(<Text>{diff} Days</Text>)

            }
        }
        return <View style={styles.historyContainer}>{res}</View>
    }

    const handeDelete = async () => {
        let data = activities.filter((item: { id: any; }) => item.id !== id)
        data = JSON.stringify(data)
        await AsyncStorage.setItem('@activities', data)
        navigation.navigate('Home')
    }
    const handleRelapse = async () => {
        let data = activities.filter((item: { id: any; }) => item.id !== id)
        let newHistory = [...activity.history, Date.now()]
        data = [...data, { id: id, title: activity.title, date: Date.now(), history: newHistory }]

        data = JSON.stringify(data)
        await AsyncStorage.setItem('@activities', data)
        navigation.navigate('Home')
    }
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{activity.title}</Text>
            <Text style={styles.text}>{date.toDateString()}</Text>
            <Text style={styles.text}>{activity.history ? handleHistory(activity.history) : <></>}</Text>
            <Button onPress={handleRelapse} title="Relapse" />
            <Button onPress={handeDelete} title="Delete this activity" />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'black',
        flex: 1,
        padding: 10,
    },
    text: {
        color: 'white',
    },
    historyContainer:{
        backgroundColor: 'yellow',
    }
})