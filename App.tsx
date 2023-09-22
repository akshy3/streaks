import HomeScreen from './screens/HomeScreen';
import { NavigationContainer } from '@react-navigation/native';
import ActivityScreen from './screens/ActivityScreen';
import AddActivityScreen from './screens/AddActivityScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import CustomNavigationBar from './components/CustomNavigationBar';


const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <PaperProvider >
      <View style={{ flex: 1, }}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName='Home' screenOptions={{
            header: (props) => <CustomNavigationBar {...props} />,
          }}

          >
            <Stack.Screen name="Home" component={HomeScreen} options={{ title: "Streaks" }} />
            <Stack.Screen name="Details" component={ActivityScreen} options={({ route }) => ({ title: route.params.title })} />
            <Stack.Screen name="Add Activity" component={AddActivityScreen} />
          </Stack.Navigator>

        </NavigationContainer>
      </View>
    </PaperProvider>
  );
}
