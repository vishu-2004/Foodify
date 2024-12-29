import { View, Text, TouchableOpacity, Image, ActivityIndicator, Pressable } from 'react-native'
import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native'
import TopNavBar from './Header'
import { StatusBar } from 'expo-status-bar'
import { ScrollView } from 'react-native'
import Header from './Header'
import RecipeCard from './RecipeCard'
import { useSelector, useDispatch } from 'react-redux';
import { getPopularRecipes, getTrendingRecipes, getRecommendedRecipes } from '../redux/action'
import EvilIcons from '@expo/vector-icons/EvilIcons';
import Feather from '@expo/vector-icons/Feather';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Entypo from '@expo/vector-icons/Entypo';
import AntDesign from '@expo/vector-icons/AntDesign';
import axios from 'axios';
import LargeRecipeCard from './LargeRecipeCard'
import  { useNavigation } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import SearchScreen from './SearchScreen'
import { SharedElement } from 'react-navigation-shared-element';
import { MaterialIcons } from '@expo/vector-icons'
import Typography from '../Typography/Typography'

// import Config from "react-native-config";

// Config.API_KEY; 
// const API_KEY="048a4f611f2e4d75bce953d398fbcbfd"
const apiKeys = [
  "bb8a1024d4894906bfe4dc3b91ac778d", //vaib
  "0dacc6ea58bc46e993d43830d1a83860",
  "e000a23d8ee9421e800d820996992df3"
 
];



const findWorkingApiKey = async (baseUrl) => {
  for (let i = 0; i < apiKeys.length; i++) {
    const apiKey = apiKeys[i];
    const url = baseUrl.replace(/apiKey=([^&]+)/, `apiKey=${apiKey}`);

    try {
      const response = await axios.get(url);
      const data = response.data;

      // Check for valid response
      if (!data.error && data.code !== 402) {
        return { apiKey, url, data };
      }
    } catch (error) {
      console.log(`Error with API key ${apiKey}:`, error.message);
    }
  }
}

const apiKey = 'xxxxxxxxx';
const HomeScreen = () => {
  useEffect(() => {
    dispatch(getPopularRecipes());
    dispatch(getTrendingRecipes());
    dispatch(getRecommendedRecipes());
  }, []);

  const navigation = useNavigation();
  const categories = [
    {
      id: 1,
      name: "Desserts",
      image: "https://www.themealdb.com/images/category/dessert.png"
    },
    {
      id: 2,
      name: "Salad",
      image: "https://www.themealdb.com/images/media/meals/k29viq1585565980.jpg"
    },
    {
      id: 3,
      name: "Beverage",
      image: "https://www.themealdb.com/images/media/meals/oe8rg51699014028.jpg"
    },
    {
      id: 4,
      name: "Snack",
      image: "https://www.themealdb.com/images/media/meals/k420tj1585565244.jpg"
    },
    {
      id: 5,
      name: "Soup",
      image: "https://www.themealdb.com/images/media/meals/7n8su21699013057.jpg"
    },
    {
      id: 6,
      name: "Appetizer",
      image: "https://www.themealdb.com/images/category/starter.png"
    }

  ]

  const [activeCat, setActiveCat] = useState("");
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.recipeReducer.loading);
  const popularRecipes = useSelector((state) => state.recipeReducer.popularRecipes || []);
  const trendingRecipes = useSelector((state) => state.recipeReducer.trendingRecipes || []);
  const recommendedRecipes = useSelector((state) => state.recipeReducer.recommendedRecipes || [])
  const error = useSelector((state) => state.recipeReducer.error);
  const [catRecipes, setcatRecipes] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const searchFocus = useSelector((state) => state.recipeReducer.searchFocus);
  const searchQuery = useSelector((state) => state.recipeReducer.searchQuery);
  const favourites = useSelector((state)=> state.recipeReducer.favourites);
 
  

 
  if (loading) {
    return <ActivityIndicator size="large" color="#FC8019" />;
  }

  if (error) {
    return <Text style={{ color: 'red', textAlign: 'center' }}>{error}</Text>;
  }
  // cat api call 


  const handleCatSelect = async (cat) => {

    setActiveCat(prevcat => {
      if (prevcat === cat) {
        setcatRecipes([]);
        return "";
      }
      else {
        return cat;
      }
    })
    if (cat === activeCat) {
      return;
    }
    try {
      setisLoading(true);
      const catURL = `https://api.spoonacular.com/recipes/complexSearch?apiKey=apikey&type=${cat}&addRecipeInformation=true&number=20&addRecipeNutrition=true&instructionsRequired=true&addRecipeInstructions=true&ignorePantry=true&fillIngredients=true`
      const response = await findWorkingApiKey(catURL);

      const filteredData = response.data.results.filter(recipes => recipes.title.length <= 60);
      setcatRecipes(filteredData);


    }
    catch (error) {
      console.log(error);
    }
    finally {
      setisLoading(false);
    }
  }


  return (
    <SafeAreaView className=" flex-1 bg-white ">
      <StatusBar style='dark' />
      {/* <KeyboardAwareScrollView
        style={{ flex: 1 }}
        
        
        
        enableOnAndroid={true}
      > */}
      <Pressable onPress={()=> navigation.navigate("SearchScreen")}>
         <Header />
      </Pressable>
        
        {/* {searchFocus && 
          <SearchScreen />
          
        } */}
        {!searchFocus &&
        <ScrollView>
          <View className="">
            <Typography variant='normal'   class="mt-2  ml-3 ">Hello, Vishal! 👋</Typography>
            <Text className="mt-3 ml-3 text-[28px]  font-PoppinsSemiBold  font-medium tracking-wide">Ready to <Text className="text-[#FC8019] font-bold">Cook</Text> something</Text>
            <Text className="mt-0 ml-3 text-[28px] font-PoppinsSemiBold mb-1 font-medium tracking-wide"><Text className="text-[#FC8019] font-bold" >Delicious</Text> at Home?</Text>


          </View>
          {/* categories  */}
          <ScrollView
            horizontal
            className="ml-2"
            showsHorizontalScrollIndicator={false}>
            {categories.map((cat, index) => {
              let isActive = cat.name === activeCat;
              let setActiveColor = isActive ? 'bg-orange-400 border-black text-white' : 'bg-orange-100';
              return (
                <SafeAreaView key={index}>
                  <TouchableOpacity
                    className="flex flex-row mx-[3px] my-2"
                    onPress={()=>handleCatSelect(cat.name)}
                  >
                    <View
                      className={`flex flex-row space-x-0 rounded-3xl align-middle border-amber-600 border-spacing-3 border-2 h-[45px] w-[120px] ${setActiveColor}`}
                      style={{ paddingRight: '30px', }}
                    >
                      <Image
                        source={{ uri: cat.image }}
                        className="rounded-full h-10 w-10 ml-0"
                      />

                      <Typography variant='sm'  className="py-[10px] px-[6px]  "
                        style={{ marginRight: "17px" }}
                      >
                        {cat.name}
                      </Typography>
                    </View>
                  </TouchableOpacity>
                </SafeAreaView>
              );
            })}
          </ScrollView>

         
          {catRecipes.length !== 0 ? (
            isLoading ? (
              <ActivityIndicator size="large" color="#FC8019" />
            ) : (
              <ScrollView >
                {/* ///display ui */}
                <View className = "flex-1 mt-[-18] h-max pb-12">
                {catRecipes.map((recipe)=>{
                    const isFavourite = recipe.id && favourites?.some((favrecipe)=> favrecipe.id == recipe.id);
                  
                  return(
                    <LargeRecipeCard
                    key={recipe.id}
                    recipe = {recipe}
                    isFav = {isFavourite}
                    />
                  )
                })}
                </View>
              </ScrollView>
            )) : (<>






            {/* recipe of the day */ }
            < Typography variant='xl' bold className = "ml-3 mt-3 mb-[-20px] ">Recipe of the Day</Typography>
        <View className="items-center mb-7">
          <TouchableOpacity className="bg-white flex-row p-2 h-[160px] w-[95%] items-center rounded-3xl mt-8"
            style={{
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 3 },
              shadowOpacity: 0.5,
              shadowRadius: 5,
              elevation: 5,
            }}

            onPress={()=>navigation.navigate("RecipeOfTheDayDetails")}
          >
            {/* heart icon  */}
            <TouchableOpacity className="absolute top-3 left-3 z-10 opacity-90 items-center bg-white p-2 py-[6] pt-2 rounded-full">
            <MaterialIcons name="favorite-border" size={24} color="red" />
            </TouchableOpacity>
            {/* image container */}
            <View className="w-[30%] h-full rounded-3xl items-center mr-11  justify-center ml-[10px]">
              <Image className="h-[140] w-[150] ml-6 object-cover  rounded-3xl" source={require('./pancake.jpg')} />
            </View>
            {/* details container  */}
            <View className="w-[56%] h-full mt-2">
              <Typography variant='normal' bold className="  text-gray-900">Caramel Strawberry Pancake</Typography>
              <Typography variant='xsm' className=" opacity-60 mt-2 ">"Fluffy pancakes topped with fresh, juicy strawberries"</Typography>
              {/* time and calories */}
              <View className=" mt-2 flex-row items-center opacity-60">
                <Feather name="clock" size={17} color="black" />
                <Typography variant="xsm" className="ml-1 mt-[1px] ">45 min</Typography>
                <Entypo name="dot-single" size={24} color="black" />
                <View className="opacity-90 flex-row">
                  <FontAwesome6 name="fire" size={16} color="black" />
                  <Typography variant='xsm' className="ml-1 mt-[1px]  ">300 cal</Typography>
                </View>
              </View>
              {/* try now btn */}
              <TouchableOpacity className="bg-orange-500 h-11  w-[130]  text-center flex-row items-center rounded-3xl p-3 mt-2 absolute top-[118] right-4"
                style={{
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 6 },
                  shadowOpacity: 0.7,
                  shadowRadius: 5,
                  elevation: 7,
                }}
                onPress={()=>navigation.navigate("RecipeOfTheDayDetails")}
              >
                <Typography variant='sm' bold className="text-white  ml-3 mr-2 ">Try Now</Typography>
                <AntDesign name="arrowright" size={21} color="white" />
              </TouchableOpacity>

            </View>



          </TouchableOpacity>
        </View>
        {/* Recommended Recipes  */}
        <Typography variant='xl' className="ml-3 mt-3 mb-2 ">Recommended Recipes</Typography>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {recommendedRecipes.map(recipe => {
              const isFavourite = recipe.id && favourites?.some((favrecipe)=> favrecipe.id == recipe.id);


            
            return (
              <RecipeCard
                key={recipe.id}
                recipe = {recipe}
                isFav = {isFavourite}
                
                
              />)

          })}
        </ScrollView>
        {/* popular Recipes */}
        <Typography variant='xl' bold className="ml-3 mt-3 mb-[7px]  ">Popular Recipes</Typography>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {popularRecipes.map(recipe => {
            const isFavourite = recipe.id && favourites?.some((favrecipe)=> favrecipe.id == recipe.id);


            let calorieNutrient = recipe.nutrition.nutrients.find(nutrient => nutrient.name === "Calories");


            let calories = calorieNutrient ? Math.round(calorieNutrient.amount) : 0;
            return (
              <RecipeCard
                key={recipe.id}
                recipe = {recipe}
                isFav = {isFavourite}
                
              />)

          })}
        </ScrollView>
        {/* trending recipes */}
        <Typography variant='xl' bold className="ml-3 mt-[10] mb-2 ">Trending Recipes</Typography>
        <ScrollView className="mb-1" horizontal showsHorizontalScrollIndicator={false}>
          {trendingRecipes.map(recipe => {

            const isFavourite = recipe.id && favourites?.some((favrecipe)=> favrecipe.id == recipe.id);

            let calorieNutrient = recipe.nutrition.nutrients.find(nutrient => nutrient.name === "Calories");


            let calories = calorieNutrient ? Math.round(calorieNutrient.amount) : 0;
            
            return (
              <RecipeCard
                key={recipe.id}
                recipe = {recipe}
                isFav = {isFavourite}
                
              />)

          })}
        </ScrollView>
        
        </>
      )}
    

    </ScrollView>
}
    {/* </KeyboardAwareScrollView> */}
    </SafeAreaView >
  )
}

export default HomeScreen;
