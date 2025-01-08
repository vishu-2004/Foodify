import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../Screens/HomeScreen";
import SplashScreen from "../Screens/SplashScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Favourites from "../Screens/Favourites";
import PostRecipe from "../Screens/PostRecipe";
import ProfileScreen from "../Screens/ProfileScreen";
import SearchScreen from "../Screens/SearchScreen";
import RecipeDetailsScreen from "../components/RecipeDetailsScreen";
import RecipeOfTheDayDetails from "../Screens/RecipeOfTheDayDetails";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";
import OptionPage from "../authScreens/OptionPage";
import LoginPage from "../authScreens/LoginPage";
import SignUpPage from "../authScreens/SignUpPage";

const Stack = createStackNavigator();

const SharedStack = createSharedElementStackNavigator();

const AuthStackNavigator = ()=>{
  return(
  <Stack.Navigator initialRouteName="OptionPage" screenOptions={{headerShown:false}}>
    <Stack.Screen name="OptionPage" component={OptionPage}/>
    <Stack.Screen name="LogInPage" component={LoginPage}/>
    <Stack.Screen name="SignUpPage" component={SignUpPage}/>
  </Stack.Navigator>
     
   
  )
}

const HomeStackNavigator = ()=>{
  return(
    <SharedStack.Navigator screenOptions={{headerShown:false}}>
    <SharedStack.Screen name="Home" component={HomeScreen}/>
    <SharedStack.Screen 
        name="SearchScreen" 
        component={SearchScreen} 
        sharedElements={(route, otherRoute, showing) => {
          return ['header']; 
        }}
      />
    <SharedStack.Screen name="RecipeDetailsScreen" 
         component={RecipeDetailsScreen}/>
    <SharedStack.Screen name="RecipeOfTheDayDetails" component={RecipeOfTheDayDetails}/>
    </SharedStack.Navigator>
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



export {HomeStackNavigator,PostRecipeStackNavigator,ProfileStackNavigator,FavouritesStackNavigator,AuthStackNavigator};
