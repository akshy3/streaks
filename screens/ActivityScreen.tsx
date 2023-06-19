import AsyncStorage from "@react-native-async-storage/async-storage";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Timeline from 'react-native-timeline-flatlist'


export default function ActivityScreen(props: { route: any; navigation: any; }) {
    const { route, navigation, } = props
    const { id, activities } = route.params;
    var activity = activities.find((item: { id: any; }) => item.id == id);
    let date = new Date(activity.date)
    const timelinedata: { time: string; title: string; description: string; circleSize?: number }[] = []


    const DateDiff = (date1: number, date2: number): number => {
        let diff = Math.floor((date1 - date2) / 86400000);
        return diff;
    }
    const handleHistory = (arr: number[]) => {
        for (let i = 0; i < arr.length; i++) {
            if (i == 0) {
                timelinedata.unshift({ time: '', title: 'You created this activity!', description: `On ${(new Date(activity.history[0]).toDateString())}` })

            }

            else {

                let diff = DateDiff(arr[i], arr[i - 1]);
                timelinedata.unshift({ time: '', title: `${diff} Days`, description: `Relapsed on ${new Date(arr[i]).toDateString()}.` })

            }

        }
        let diff = DateDiff(Number(new Date().setHours(0, 0, 0, 0)), activity.history[activity.history.length - 1]);
        timelinedata.unshift({ time: '', title: `${diff} Days`, description: `And still going! `, circleSize: 5 })



    }
    handleHistory(activity.history)

    const handeDelete = async () => {
        let data = activities.filter((item: { id: any; }) => item.id !== id)
        data = JSON.stringify(data)
        await AsyncStorage.setItem('@activities', data)
        navigation.navigate('Home')
    }
    const handleRelapse = async () => {
        if (activity.history[activity.history.length -1]!== Number(new Date().setHours(0,0,0,0))) {

            let data = activities.filter((item: { id: any; }) => item.id !== id)
            let newHistory = [...activity.history, Number(new Date().setHours(0, 0, 0, 0))]
            data = [...data, { id: id, title: activity.title, date: (Number(new Date(Date.now()).setHours(0, 0, 0, 0))), history: newHistory }]

            data = JSON.stringify(data)
            await AsyncStorage.setItem('@activities', data)
            navigation.navigate('Home')
        }

    }
    return (
        <View style={styles.container}>
            <Timeline data={timelinedata}
                style={styles.historyContainer}
                titleStyle={{ color: 'white' }}
                circleColor='white'
                lineColor='white'
                descriptionStyle={{ color: 'gray' }}
            />
            <TouchableOpacity style={styles.relapseButton} onPress={handleRelapse}><Text style={styles.relapseButtonText}>Relapse</Text></TouchableOpacity> 
            <TouchableOpacity style={styles.deleteButton} onPress={handeDelete}><Text style={styles.deleteButtonText}>Delete this activity</Text></TouchableOpacity> 
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#03071E',
        flex: 1,
        padding: 10,
    },
    text: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20,
    },
    historyContainer: {
        margin: 20,
        // backgroundColor: 'black',
    },
    relapseButton: {
        // backgroundColor: '#370617',
        width: '40%',
        marginTop: 10,
        marginBottom: 10,
        padding: 5,
        borderWidth: 1,
        borderColor: 'white',

    },
    relapseButtonText: {
        color: 'white',
        padding: 10,
        fontWeight: 'bold',
    },
    deleteButton: {
        // backgroundColor: '#6A040F',
        padding: 10,
        borderWidth: 0.5,
        borderColor: 'white',
        

    },
    deleteButtonText: {
        color: 'white',
        fontWeight: 'bold',
    }
})