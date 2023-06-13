import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import HomeScreen from './screens/HomeScreen';
import { NavigationContainer } from '@react-navigation/native';
import ActivityScreen from './screens/ActivityScreen';
import AddActivityScreen from './screens/AddActivityScreen';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
// let aa=async () => {
//   await AsyncStorage.setItem('@activities',JSON.stringify([{id:}]))
//   let a=await AsyncStorage.getItem('@activities')
//   console.log(a)
// }

const Stack = createStackNavigator();
export default function App() {
//  aa();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
          <Stack.Screen name="Home" component={HomeScreen} options={{ title: "Streaks" }} />
          <Stack.Screen name="Details" component={ActivityScreen} options={{ title: "Details" }} />
          <Stack.Screen name="AddActivity" component={AddActivityScreen} screenOptions={{presentation: 'modal'}} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
