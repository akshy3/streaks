import { View, Text, StyleSheet, Dimensions, Pressable, TouchableOpacity } from 'react-native'




export default function Activity(props: { navigation: { navigate: any; }; activities: any[]; id: any; }) {
    const { navigate } = props.navigation;
    var activity = props.activities.find(item=>item.id==props.id);

    var diff = Math.floor((Number(new Date().setHours(0,0,0,0)) - activity.date) / 86400000);

    return (
        <TouchableOpacity style={styles.container} onPress={()=> navigate('Details',{id: props.id, activities:props.activities, title: activity.title})}>

            <Text style={styles.title}>{activity.title}</Text>
            <Text style={styles.title}>{diff} {diff == 0? 'day':'days'}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        // backgroundColor: '#3b3a4b',
        borderWidth: 0.3,
        borderColor: '#FEFAE0',
        borderRadius: 5,
        flexDirection: 'row',
        padding: 13,
        margin: 8,
        justifyContent: 'space-between',
    },
    title: {
        color: 'white',
        fontWeight: 'bold',


    }
})