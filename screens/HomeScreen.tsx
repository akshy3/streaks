import { Button, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from "react";
import Activity from "../components/Activity";


interface activity { id: string, title: string, date: number, history: [] };


export default function HomeScreen(props: { navigation: any; }) {
  const { navigation } = props;
  const [activities, setActivities] = useState<activity[]>(new Array())


  const getData = async () => {

    const jsonValue = await AsyncStorage.getItem('@activities')
    console.log(jsonValue)
    let res: activity[] = await JSON.parse(jsonValue || '[]')
    setActivities(res)


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
      <ScrollView>

        <View>{activities.length > 0 ? activities.map((e, index) => (<Activity id={e.id} activities={activities} key={index} navigation={navigation} />)) : <><Text style={styles.emptyInfo}>Nothing here.</Text></>}</View>
      </ScrollView>

      <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('AddActivity')}><Text style={styles.buttonText}>+</Text></TouchableOpacity>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    flex: 1,
    flexDirection: 'column',
    padding: 10,
    position: 'relative',
  },
  emptyInfo: {
    color: 'white',
  },
  addButton: {
    backgroundColor: 'red',
    position: 'absolute',
    bottom: 30,
    right: 20,
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',


  },
  buttonText: {
    fontSize: 50,
    textAlign: 'center',
    textAlignVertical: 'center',
    fontWeight: 'bold',
  }
})