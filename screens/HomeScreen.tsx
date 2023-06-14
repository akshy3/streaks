import { Button, StyleSheet, Text, View } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from "react";
import Activity from "../components/Activity";


interface activity { id: string, title: string, date: number };


export default function HomeScreen(props: { navigation: any; }) {
  const {navigation} = props;
  const [activities, setActivities] = useState<activity[]>(new Array())


  const getData = async () => {

    const jsonValue = await AsyncStorage.getItem('@activities')
    if (jsonValue!="") {
      let res:activity[] = await JSON.parse(jsonValue)
      setActivities(res)
    }

  }

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // The screen is focused
      // Call any action and update data
      getData();
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [])



  return (

    <View style={styles.container}>
      <View>{ activities?.map((e, index) => (<Activity id={e.id} activities={activities} key={index} navigation={navigation} />))}</View>
      <Button title="Add activity" onPress={() => navigation.navigate('AddActivity')} />

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    flex: 1,
    flexDirection: 'column',
  }
})