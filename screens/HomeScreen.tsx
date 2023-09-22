import { ScrollView, StyleSheet, View } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from "react";
import Activity from "../components/Activity";
import { AnimatedFAB, Chip, Divider, Text } from "react-native-paper";


interface activity { id: string, title: string, date: number, history: [] };


export default function HomeScreen(props: { navigation: any; }) {
  const { navigation } = props;
  const [activities, setActivities] = useState<activity[]>(new Array())


  const getData = async () => {

    const jsonValue = await AsyncStorage.getItem('@activities')
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



  return (<>

    <View style={styles.container}>
      <ScrollView>

        <View>{activities.length > 0 ? activities.map((e, index) => (<><Activity id={e.id} activities={activities} key={e.id} navigation={navigation} /><Divider /></>)) : <><Chip >Add activities to view them here.</Chip></>}</View>
      </ScrollView>

      <AnimatedFAB
        icon={'plus'}
        label={'Create Activity'}
        style={[styles.addButton]}
        onPress={() => navigation.navigate('Add Activity')}
        extended={true}
      />
    </View>
  </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },

  addButton: {
    bottom: 30,
    right: 20,
  },

})