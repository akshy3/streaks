import { View, Text, StyleSheet, Dimensions, Pressable } from 'react-native'

// interface Props {
//     id: string,
//     name: string,
// }


export default function Activity(props) {
    const { navigate } = props.navigation;
    console.log("props",props)
    var activity = props.activities.activities.find(item=>item.id==props.id);

    var diff = Math.floor((Date.now() - activity.start) / 86400000);

    return (
        <Pressable style={styles.container} onPress={()=> navigate('Details')}>

            <Text style={styles.title}>{activity.name} </Text>
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