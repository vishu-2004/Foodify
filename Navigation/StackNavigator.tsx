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
import { AuthStackParamList } from "../navigation";
import { PostRecipeStackParamList,HomeStackParamList,FavouritesStackParamList,ProfileStackParamList } from "../navigation";

const AuthStack = createStackNavigator<AuthStackParamList>();

const SharedStack = createSharedElementStackNavigator<HomeStackParamList>();
const Stack = createStackNavigator<PostRecipeStackParamList >();
const FavouriteStack = createStackNavigator<FavouritesStackParamList>();
const ProfileStack = createStackNavigator<ProfileStackParamList>();

const AuthStackNavigator = () => {
  return (
    <AuthStack.Navigator initialRouteName="OptionPage" screenOptions={{ headerShown: false}}>
      <AuthStack.Screen name="OptionPage" component={OptionPage} />
      <AuthStack.Screen name="LogInPage" component={LoginPage} />
      <AuthStack.Screen name="SignUpPage" component={SignUpPage} />
    </AuthStack.Navigator>


  )
}

const HomeStackNavigator = () => {
  return (
    <SharedStack.Navigator screenOptions={{ headerShown: false }}>
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
    const { recipeId } = route.params;
    return [`recipe-${recipeId}`]; 
  }}
/>


      <SharedStack.Screen name="RecipeOfTheDayDetails" component={RecipeOfTheDayDetails} />
    </SharedStack.Navigator>
  );

}
const FavouritesStackNavigator = () => {
  return (
    <FavouriteStack.Navigator screenOptions={{ headerShown: false }}>
      <FavouriteStack.Screen name="Favourites" component={Favourites} />
    </FavouriteStack.Navigator>
  );
}
const PostRecipeStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="PostRecipe" component={PostRecipe} />
      <Stack.Screen name="AiRecipeDisplay" component={AIRecipeDisplay} />
    </Stack.Navigator>
  );
}
const ProfileStackNavigator = () => {
  return (
    <ProfileStack.Navigator screenOptions={{ headerShown: false }}>
      <ProfileStack.Screen name="Profile" component={ProfileScreen} />
    </ProfileStack.Navigator>
  );
}



export { HomeStackNavigator, PostRecipeStackNavigator, ProfileStackNavigator, FavouritesStackNavigator, AuthStackNavigator };
