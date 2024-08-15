import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../components/Screens/HomeScreen";
import SplashScreen from "../components/Screens/SplashScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Favourites from "../components/Screens/Favourites";
import PostRecipe from "../components/Screens/PostRecipe";
import ProfileScreen from "../components/Screens/ProfileScreen";

const Stack = createStackNavigator();

const HomeStackNavigator = ()=>{
  return(
    <Stack.Navigator screenOptions={{headerShown:false}}>
    <Stack.Screen name="Home" component={HomeScreen}/>
    </Stack.Navigator>
  );

}
const FavouritesStackNavigator = () =>{
  return(
    <Stack.Navigator screenOptions={{headerShown:false}}>
    <Stack.Screen name="Favourites" component={Favourites}/>
    </Stack.Navigator>
  );
}
const PostRecipeStackNavigator = () =>{
  return(
    <Stack.Navigator screenOptions={{headerShown:false}}>
    <Stack.Screen name="Post Recipe" component={PostRecipe}/>
    </Stack.Navigator>
  );
}
const ProfileStackNavigator = () =>{
  return(
    <Stack.Navigator screenOptions={{headerShown:false}}>
    <Stack.Screen name="Profile" component={ProfileScreen}/>
    </Stack.Navigator>
  );
}



export {HomeStackNavigator,PostRecipeStackNavigator,ProfileStackNavigator,FavouritesStackNavigator};
