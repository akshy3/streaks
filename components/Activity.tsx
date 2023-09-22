import { List, Text } from 'react-native-paper';


export default function Activity(props: { navigation: { navigate: any; }; activities: any[]; id: any; }) {
    const { navigate } = props.navigation;
    var activity = props.activities.find(item => item.id == props.id);

    var diff = Math.floor((Number(new Date().setHours(0, 0, 0, 0)) - activity.date) / 86400000);

    return (
        <>
            <List.Item
                title={activity.title}
                left={props =>  <List.Icon {...props} icon="file-tree" />}
                
                right={props=> <><Text>{diff} days</Text></>}
                onPress={() => navigate('Details', { id: props.id, activities: props.activities, title: activity.title })} />
        
        </>
    )
}

