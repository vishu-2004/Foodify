import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../components/Screens/HomeScreen";
import SplashScreen from "../components/Screens/SplashScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Favourites from "../components/Screens/Favourites";
import PostRecipe from "../components/Screens/PostRecipe";
import ProfileScreen from "../components/Screens/ProfileScreen";
import SearchScreen from "../components/Screens/SearchScreen";
import RecipeDetailsScreen from "../components/Screens/RecipeDetailsScreen";
import RecipeOfTheDayDetails from "../components/Screens/RecipeOfTheDayDetails";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";

const Stack = createStackNavigator();

const SharedStack = createSharedElementStackNavigator();

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
    <SharedStack.Screen name="RecipeDetailsScreen" component={RecipeDetailsScreen}/>
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



export {HomeStackNavigator,PostRecipeStackNavigator,ProfileStackNavigator,FavouritesStackNavigator};
