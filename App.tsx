import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import HomeScreen from './components/Screens/HomeScreen';
// import 'nativewind/tailwind.config';
import TabNavigator from './Navigation/TabNavigator';
import SplashScreen from './components/Screens/SplashScreen';




export default function App() {
  const EntryStack = createStackNavigator();
  return (
    <NavigationContainer>
      
      <EntryStack.Navigator initialRouteName='Splash' screenOptions={{ headerShown: false }}>
        <EntryStack.Screen name="Splash" component={SplashScreen}  />
        <EntryStack.Screen name="MainApp" component={TabNavigator}  />
      </EntryStack.Navigator>
    </NavigationContainer>
  );
}


