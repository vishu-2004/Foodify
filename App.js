import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import HomeScreen from "./Screens/HomeScreen";
import TabNavigator from "./Navigation/TabNavigator";
import SplashScreenComponent from "./Screens/SplashScreen"; // Renamed to avoid conflict with expo-splash-screen
import { Provider } from "react-redux";
import { AppRegistry } from "react-native";
import { name as appName } from "./app.json";
import store from "./redux/store";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen"; // Importing expo-splash-screen
import { useEffect, useCallback } from "react";
import { AuthStackNavigator } from "./Navigation/StackNavigator";
import { ModalProvider } from "./Contexts/modalContext";
import Modal from "./components/Modals";
import AuthProvider from "./Contexts/AuthContext";

SplashScreen.preventAutoHideAsync(); // Prevent the splash screen from auto-hiding

export default function App() {
  const EntryStack = createStackNavigator();

  const [fontsLoaded] = useFonts({
    "Poppins-Light": require("./assets/fonts/Poppins-Light.ttf"),
    Poppins: require("./assets/fonts/Poppins-Regular.ttf"),
    "Poppins-Medium": require("./assets/fonts/Poppins-Medium.ttf"),
    "Poppins-SemiBold": require("./assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Bold": require("./assets/fonts/Poppins-Bold.ttf"),
    "Poppins-Black": require("./assets/fonts/Poppins-Black.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync(); // Hide the splash screen once fonts are loaded
    }
  }, [fontsLoaded]);

  useEffect(() => {
    if (fontsLoaded) {
      onLayoutRootView(); // Call the function when fonts are loaded
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null; // Render nothing until fonts are loaded
  }

  return (
    <AuthProvider>
      <Provider store={store}>
        <ModalProvider>
          <NavigationContainer onReady={onLayoutRootView}>
            <EntryStack.Navigator
              initialRouteName="Splash"
              screenOptions={{ headerShown: false }}
            >
              <EntryStack.Screen
                name="Splash"
                component={SplashScreenComponent}
              />
              <EntryStack.Screen name="Auth" component={AuthStackNavigator} />
              <EntryStack.Screen name="MainApp" component={TabNavigator} />
            </EntryStack.Navigator>
            <Modal />
          </NavigationContainer>
        </ModalProvider>
      </Provider>
    </AuthProvider>
  );
}

AppRegistry.registerComponent(appName, () => App);
