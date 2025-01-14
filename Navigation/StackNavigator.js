import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../Screens/HomeScreen";

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
import AIRecipeDisplay from "../Screens/AIRecipeDisplay";

const Stack = createStackNavigator();

const SharedStack = createSharedElementStackNavigator();

const AuthStackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="OptionPage" screenOptions={{ headerShown: false,animation: "slide_from_right" }}>
      <Stack.Screen name="OptionPage" component={OptionPage} />
      <Stack.Screen name="LogInPage" component={LoginPage} />
      <Stack.Screen name="SignUpPage" component={SignUpPage} />
    </Stack.Navigator>


  )
}

const HomeStackNavigator = () => {
  return (
    <SharedStack.Navigator screenOptions={{ headerShown: false ,animation: "slide_from_right"}}>
      <SharedStack.Screen name="home" component={HomeScreen} />
      <SharedStack.Screen
        name="SearchScreen"
        component={SearchScreen}
        sharedElements={(route, otherRoute, showing) => {
          return ['header'];
        }}
      />
      <SharedStack.Screen
  name="RecipeDetailsScreen"
  component={RecipeDetailsScreen}
  options={{
    headerShown: false,
    gestureEnabled: false,
    cardStyleInterpolator: ({ current: { progress } }) => ({
      cardStyle: {
        opacity: progress,
      },
    }),
  }}
  sharedElements={(route, otherRoute, showing) => {
    const { recipeId } = route.params; // Assuming `recipeId` is passed as a param
    return [`recipe-${recipeId}`]; // Return only the `id` of the shared element
  }}
/>


      <SharedStack.Screen name="RecipeOfTheDayDetails" component={RecipeOfTheDayDetails} />
    </SharedStack.Navigator>
  );

}
const FavouritesStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Favourites" component={Favourites} />
    </Stack.Navigator>
  );
}
const PostRecipeStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false ,animation: "slide_from_right"}}>
      <Stack.Screen name="Post Recipe" component={PostRecipe} />
      <Stack.Screen name="AiRecipeDisplay" component={AIRecipeDisplay} />
    </Stack.Navigator>
  );
}
const ProfileStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Profile" component={ProfileScreen} />
    </Stack.Navigator>
  );
}



export { HomeStackNavigator, PostRecipeStackNavigator, ProfileStackNavigator, FavouritesStackNavigator, AuthStackNavigator };
