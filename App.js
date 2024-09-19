import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import HomeScreen from './components/Screens/HomeScreen';
// import 'nativewind/tailwind.config';
import TabNavigator from './Navigation/TabNavigator';
import SplashScreen from './components/Screens/SplashScreen';
import { Provider } from 'react-redux';
import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';
import store from './components/redux/store';



export default function App() {
  const EntryStack = createStackNavigator();
  return (
    <Provider store={store}>
    <NavigationContainer>
      
      <EntryStack.Navigator initialRouteName='Splash' screenOptions={{ headerShown: false }}>
        <EntryStack.Screen name="Splash" component={SplashScreen}  />
        <EntryStack.Screen name="MainApp" component={TabNavigator}  />
      </EntryStack.Navigator>
    </NavigationContainer>
    </Provider>
  );
}
AppRegistry.registerComponent(appName, () => App);


