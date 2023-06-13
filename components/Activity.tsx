import { View, Text, StyleSheet, Dimensions, Pressable } from 'react-native'




export default function Activity(props: { navigation: { navigate: any; }; activities: any[]; id: any; }) {
    const { navigate } = props.navigation;
    var activity = props.activities.find(item=>item.id==props.id);
    console.log("activity",activity)

    var diff = Math.floor((Date.now() - activity.date) / 86400000);

    return (
        <Pressable style={styles.container} onPress={()=> navigate('Details',{id: props.id})}>

            <Text style={styles.title}>{activity.title}</Text>
            <Text style={styles.title}>{diff} {diff == 0? 'day':'days'}</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'black',
        borderWidth: 4,
        borderColor: 'white',
        borderRadius: 10,
        flexDirection: 'row',
        padding: 7,
        margin: 5,
        justifyContent: 'space-between',
    },
    title: {
        color: 'white',

    }
})