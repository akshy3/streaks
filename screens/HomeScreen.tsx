import { Button, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from "react";
import Activity from "../components/Activity";
import PlusSvg from "../components/PlusSvg";


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

        <View>{activities.length > 0 ? activities.map((e, index) => (<Activity id={e.id} activities={activities} key={index} navigation={navigation} />)) : <><Text style={styles.emptyInfo}>Add activities to view them here.</Text></>}</View>
      </ScrollView>

      <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('AddActivity')}><PlusSvg /></TouchableOpacity>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#03071E',
    flex: 1,
    flexDirection: 'column',
    padding: 10,
    position: 'relative',
  },
  emptyInfo: {
    color: 'white',
    margin: 40,
  },
  addButton: {
    // backgroundColor: '#370617',
    // borderWidth: 4,
    borderColor: 'white',
    position: 'absolute',
    bottom: 30,
    right: 20,
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',



  }
})