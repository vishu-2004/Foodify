import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../components/Screens/HomeScreen";
import PostRecipe from "../components/Screens/PostRecipe";
import Favourites from "../components/Screens/Favourites";
import ProfileScreen from "../components/Screens/ProfileScreen";
import { FavouritesStackNavigator, HomeStackNavigator, PostRecipeStackNavigator, ProfileStackNavigator } from "./StackNavigator";
import Entypo from '@expo/vector-icons/Entypo';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const TabNav = createBottomTabNavigator();

const TabNavigator = () => {

    return (
        <TabNav.Navigator screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: "#FC8019",
            tabBarInactiveTintColor: "black",
            tabBarStyle: {
                position: 'absolute',
                bottom: 16,
                left: 16,
                right: 16,
                elevation: 10,
                backgroundColor: '#ffffff',
                borderRadius: 15,
                height: 76,
                shadowColor: '#000',
                shadowOpacity: 0.1,
                shadowOffset: { width: 0, height: 10 },
                shadowRadius: 10,
            },
            tabBarLabelStyle: {
                fontSize: 14,
                paddingBottom: 10,

                marginTop: -10,
                fontWeight: 600,
            }


        }}>
            <TabNav.Screen name="Home" component={HomeStackNavigator}
               options={{
                tabBarIcon: ({ focused }) => (
                  focused ? (
                    <MaterialCommunityIcons name="home" size={26} color="#FC8019" />
                  ) : (
                    <MaterialCommunityIcons name="home-outline" size={26} color="black" />
                  )
                )
              }}  />
            <TabNav.Screen name="Upload" options={{
                tabBarIcon: ({ focused }) => (
                    focused?(
                        <MaterialCommunityIcons name="file-document-edit" size={26} color={focused ? "#FC8019" : "black"} />
                    ): <MaterialCommunityIcons name="file-document-edit-outline" size={26} color={focused ? "#FC8019" : "black"} />
                    



                )
            }} component={PostRecipeStackNavigator} />
            <TabNav.Screen name="Favourites" options={{
                tabBarIcon: ({ focused }) => (
                    !focused ?(
                        <MaterialIcons name="favorite-border" size={26} color="black" />):(
            <MaterialIcons name="favorite" size={26} color="#FC8019" />
            )
            )
        
        }} component={FavouritesStackNavigator}/>
            <TabNav.Screen name="Profile" options={{
    tabBarIcon: ({ focused }) => (
      focused ? (
        <MaterialIcons name="person" size={24} color="#FC8019" />
      ) : (
        <MaterialIcons name="person-outline" size={24} color="black" />
      )
    )
  }} component={ProfileStackNavigator} />

        </TabNav.Navigator>
    );
}
export default TabNavigator;