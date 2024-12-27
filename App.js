import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import HomeScreen from './components/Screens/HomeScreen';
import TabNavigator from './Navigation/TabNavigator';
import SplashScreen from './components/Screens/SplashScreen';
import { Provider } from 'react-redux';
import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';
import store from './components/redux/store';
import { useFonts } from 'expo-font';

export default function App() {
  const EntryStack = createStackNavigator();

  const [fontsLoaded] = useFonts({
    "Poppins-Light": require("./assets/fonts/Poppins-Light.ttf"),
    "Poppins": require("./assets/fonts/Poppins-Regular.ttf"),
    "Poppins-Medium": require("./assets/fonts/Poppins-Medium.ttf"),
    "Poppins-SemiBold": require("./assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Bold": require("./assets/fonts/Poppins-Bold.ttf"),
    "Poppins-Black": require("./assets/fonts/Poppins-Black.ttf"),
  });

  // Show the Splash Screen until fonts are loaded
  // if (!fontsLoaded) {
  //   return <SplashScreen />;
  // }

  return (
    <Provider store={store}>
      <NavigationContainer>
        <EntryStack.Navigator initialRouteName="MainApp" screenOptions={{ headerShown: false }}>
          <EntryStack.Screen name="Splash" component={SplashScreen} />
          <EntryStack.Screen name="MainApp" component={TabNavigator} />
        </EntryStack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

AppRegistry.registerComponent(appName, () => App);
