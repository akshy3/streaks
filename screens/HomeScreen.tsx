import { Button, StyleSheet, Text, View } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from "react";
import Activity from "../components/Activity";
import uuid from 'react-native-uuid';

var anActivity = { "activities": [{ "id": uuid.v4(), "name": "random", "start": Date.now() }, { "id": uuid.v4(), "name": "hello", "start": Date.now() }] }

const storeData = async (value: object) => {
  try {
    const jsonValue = JSON.stringify(value)
    await AsyncStorage.setItem('@activities', jsonValue)
  } catch (e) {
    // saving error
  }
}


const getData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('@activities')
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    // error reading value
  }
}

const dothat = async () => {
  await storeData(anActivity)
  let a = await getData();
  console.log(a)
}
export default function HomeScreen({navigation}) {

  const [activities, setActivities] = useState(anActivity)
  dothat();


  let val = getData();
  console.log(activities)
  return (<View style={styles.container}>
    <View>{activities.activities.map((e, index) => (<Activity id={e.id} activities={activities} key={index} />))}</View>
    <Button title="Add activity" onPress={()=>navigation.navigate('AddActivity')}/>

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