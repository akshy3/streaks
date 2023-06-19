
import { StatusBar } from 'expo-status-bar';
import HomeScreen from './screens/HomeScreen';
import { NavigationContainer } from '@react-navigation/native';
import ActivityScreen from './screens/ActivityScreen';
import AddActivityScreen from './screens/AddActivityScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {View} from 'react-native';
// let aa=async () => {
//   await AsyncStorage.setItem('@activities',JSON.stringify([{id:}]))
//   let a=await AsyncStorage.getItem('@activities')
//   console.log(a)
// }

const Stack = createNativeStackNavigator();
export default function App() {
  //  aa();
  return (
      <View style={{backgroundColor: '#03071E', flex: 1}}>
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'
        screenOptions={{
          headerStyle: {
            backgroundColor: '#03071E',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: "Streaks" }} />
        <Stack.Screen name="Details" component={ActivityScreen} options={({ route }) => ({ title: route.params.title })} />
        <Stack.Screen name="AddActivity" component={AddActivityScreen}  />
      </Stack.Navigator>
      <StatusBar style='light' />

    </NavigationContainer>
      </View>
  );
}
