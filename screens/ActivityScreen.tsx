import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import { StyleSheet, View } from "react-native";
import { Button, Dialog, Portal, Text } from "react-native-paper";
import Timeline from 'react-native-timeline-flatlist'


export default function ActivityScreen(props: { route: any; navigation: any; }) {
    const { route, navigation, } = props
    const { id, activities } = route.params;
    var activity = activities.find((item: { id: any; }) => item.id == id);
    let date = new Date(activity.date)
    const timelinedata: { time: string; title: string; description: string; circleSize?: number }[] = []

    const [deleteDialogVisible, setDeleteDialogVisible] = React.useState(false);
    const [relapseDialogVisible, setRelapseDialogVisible] = React.useState(false);



    const DateDiff = (date1: number, date2: number): number => {
        let diff = Math.floor((date1 - date2) / 86400000);
        return diff;
    }
    const handleHistory = (arr: number[]) => {
        for (let i = 0; i < arr.length; i++) {
            if (i == 0) {
                timelinedata.unshift({ time: '', title: 'You created this activity', description: `On ${(new Date(activity.history[0]).toDateString())}.` })

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

    const handleDelete = async () => {
        let data = activities.filter((item: { id: any; }) => item.id !== id)
        data = JSON.stringify(data)
        await AsyncStorage.setItem('@activities', data)
        navigation.navigate('Home')
    }
    const handleRelapse = async () => {

        if (activity.history[activity.history.length - 1] !== Number(new Date().setHours(0, 0, 0, 0))) {

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
            <Portal>
                <Dialog
                    visible={deleteDialogVisible}
                    onDismiss={() => { setDeleteDialogVisible(false) }}>
                    <Dialog.Title>Confirm Delete</Dialog.Title>
                    <Dialog.Content>
                        <Text variant="bodyMedium">Do you want to delete for sure?</Text>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={() => { setDeleteDialogVisible(false) }}>Cancel</Button>

                        <Button onPress={handleDelete}>Delete</Button>
                    </Dialog.Actions>
                </Dialog>

                <Dialog
                    visible={relapseDialogVisible}
                    onDismiss={() => { setRelapseDialogVisible(false) }}>
                    <Dialog.Title>Confirm Relapse</Dialog.Title>
                    <Dialog.Content>
                        <Text variant="bodyMedium">Do you want to relapse for sure?</Text>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={() => { setRelapseDialogVisible(false) }}>Cancel</Button>

                        <Button onPress={handleRelapse}>Relapse</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
            <Timeline data={timelinedata}

            />

            <Button style={styles.relapseButton} icon="autorenew" mode="contained" onPress={() => { setRelapseDialogVisible(true) }}>Relapse</Button>
            <Button icon="delete" mode="contained" onPress={() => { setDeleteDialogVisible(true) }}>Delete this activity</Button>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },


    relapseButton: {

        marginTop: 10,
        marginBottom: 10,
    },


})