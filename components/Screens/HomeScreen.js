import { View, Text, TouchableOpacity, Image, ActivityIndicator } from 'react-native'
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


const apiKey = 'c1c7bf80fce74634ae18b9271af99c50';
const HomeScreen = () => {
  useEffect(() => {
    // dispatch(getPopularRecipes());
    // dispatch(getTrendingRecipes());
    // dispatch(getRecommendedRecipes());
  }, [dispatch]);

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
  const popularRecipes = useSelector((state) => state.recipeReducer.popularRecipes);
  const trendingRecipes = useSelector((state) => state.recipeReducer.trendingRecipes);
  const recommendedRecipes = useSelector((state) => state.recipeReducer.recommendedRecipes)
  const error = useSelector((state) => state.recipeReducer.error);
  const [catRecipes, setcatRecipes] = useState([]);
  const [isLoading, setisLoading] = useState(false);

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
        prevcat === cat ? "" : cat;
      }
    })
    if (cat === activeCat) {
      return;
    }
    try {
      setisLoading(true)
      const count = 0;
      const response = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&type=${cat}&addRecipeInformation=true&number=20&addRecipeNutrition=true`);

      const data = response.data;
      if (count <= 15) {
        const filteredData = data.results.filter(recipes => recipes.title.length <= 60);
        setcatRecipes(filteredData);
        count++;
      }

    }
    catch (error) {
      console.log(error);
    }
    finally {
      setisLoading(false);
    }
  }


  return (
    <SafeAreaView className=" flex-1 mb-22">
      <StatusBar style='dark' />
      <ScrollView>
        <Header />
        <View >
          <View>
            <Text className="mt-2 ml-[17px] text-lg">Hello, Vishal! 👋</Text>
            <Text className="mt-3 ml-4 text-[30px] mb-1  font-medium tracking-wide">Ready to <Text className="text-[#FC8019] font-bold">Cook</Text> something</Text>
            <Text className="mt-0 ml-4 text-[30px] mb-4 font-medium tracking-wide"><Text className="text-[#FC8019] font-bold" >Delicious</Text> at Home?</Text>


          </View>
          {/* categories  */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}>
            {categories.map((cat, index) => {
              let isActive = cat.name === activeCat;
              let setActiveColor = isActive ? 'bg-orange-400 border-black text-white' : 'bg-orange-100';
              return (
                <SafeAreaView key={index}>
                  <TouchableOpacity
                    className="flex flex-row mx-1 my-2"
                    onPress={handleCatSelect(cat.name)}
                  >
                    <View
                      className={`flex flex-row space-x-0 rounded-3xl align-middle border-amber-600 border-spacing-3 border-2 h-[45px] w-[110px] ${setActiveColor}`}
                      style={{ paddingRight: '30px', }}
                    >
                      <Image
                        source={{ uri: cat.image }}
                        className="rounded-full h-10 w-10 ml-0"
                      />

                      <Text className="py-[10px] px-[7px]  font-medium text-[14px]"
                        style={{ marginRight: "12px" }}
                      >
                        {cat.name}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </SafeAreaView>
              );
            })}
          </ScrollView>

          {/* CATEGORIES DISPLAY */}
          {catRecipes.length !== 0 ? (
            isLoading ? (
              <ActivityIndicator size="large" color="#FC8019" />
            ) : (
              <ScrollView>
                {/* ///display ui */}
              </ScrollView>
            )) : (<Text></Text>)}






            {/* recipe of the day */ }
            < Text className = "ml-3 mt-3 mb-[-20px] text-xl font-semibold">Recipe of the Day</Text>
        <View className="items-center mb-7">
          <TouchableOpacity className="bg-white flex-row p-2 h-[160px] w-[95%] items-center rounded-3xl mt-8"
            style={{
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 3 },
              shadowOpacity: 0.5,
              shadowRadius: 5,
              elevation: 5,
            }}
          >
            {/* heart icon  */}
            <TouchableOpacity className="absolute top-3 left-3 z-10 opacity-90 items-center bg-white p-1 py-[5] rounded-full">
              <EvilIcons name="heart" size={29} color="red" />
            </TouchableOpacity>
            {/* image container */}
            <View className="w-[30%] h-full rounded-3xl items-center mr-11  justify-center ml-[10px]">
              <Image className="h-[140] w-[150] ml-6 object-cover  rounded-3xl" source={require('./pancake.jpg')} />
            </View>
            {/* details container  */}
            <View className="w-[56%] h-full mt-2">
              <Text className="text-[18px] font-bold text-gray-900">Caramel Strawberry Pancake</Text>
              <Text className="text-[13px] font-medium opacity-60 mt-2 ">"Fluffy pancakes topped with fresh, juicy strawberries"</Text>
              {/* time and calories */}
              <View className=" mt-2 flex-row items-center opacity-60">
                <Feather name="clock" size={17} color="black" />
                <Text className="ml-1  text-[13px]">45 min</Text>
                <Entypo name="dot-single" size={24} color="black" />
                <View className="opacity-90 flex-row">
                  <FontAwesome6 name="fire" size={16} color="black" />
                  <Text className="ml-1 text-[13px] ">300 cal</Text>
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
              >
                <Text className="text-white text-[15px] ml-3 mr-2 font-bold">Try Now</Text>
                <AntDesign name="arrowright" size={21} color="white" />
              </TouchableOpacity>

            </View>



          </TouchableOpacity>
        </View>
        {/* Recommended Recipes  */}
        <Text className="ml-3 mt-3  text-xl font-semibold">Recommended Recipes</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {recommendedRecipes.map(recipe => {



            let calorieNutrient = recipe.nutrition.nutrients.find(nutrient => nutrient.name === "Calories");


            let calories = calorieNutrient ? Math.round(calorieNutrient.amount) : 0;
            return (
              <RecipeCard
                key={recipe.id}
                id={recipe.id}
                img={recipe.image}
                title={recipe.title}
                time={recipe.readyInMinutes}
                cal={calories}
                onPress={() => console.warn(`Selected recipe: ${recipe.title}`)}
              />)

          })}
        </ScrollView>
        {/* popular Recipes */}
        <Text className="ml-3 mt-3  text-xl font-semibold">Popular Recipes</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {popularRecipes.map(recipe => {



            let calorieNutrient = recipe.nutrition.nutrients.find(nutrient => nutrient.name === "Calories");


            let calories = calorieNutrient ? Math.round(calorieNutrient.amount) : 0;
            return (
              <RecipeCard
                key={recipe.id}
                id={recipe.id}
                img={recipe.image}
                title={recipe.title}
                time={recipe.readyInMinutes}
                cal={calories}
                onPress={() => console.warn(`Selected recipe: ${recipe.title}`)}
              />)

          })}
        </ScrollView>
        {/* trending recipes */}
        <Text className="ml-3 mt-[-10] mb-1 text-xl font-semibold">Trending Recipes</Text>
        <ScrollView className="mb-20" horizontal showsHorizontalScrollIndicator={false}>
          {trendingRecipes.map(recipe => {



            let calorieNutrient = recipe.nutrition.nutrients.find(nutrient => nutrient.name === "Calories");


            let calories = calorieNutrient ? Math.round(calorieNutrient.amount) : 0;
            return (
              <RecipeCard
                key={recipe.id}
                id={recipe.id}
                img={recipe.image}
                title={recipe.title}
                time={recipe.readyInMinutes}
                cal={calories}
                onPress={() => console.warn(`Selected recipe: ${recipe.title}`)}
              />)

          })}
        </ScrollView>
        

      </View>
   

    </ScrollView>
    </SafeAreaView >
  )
}

export default HomeScreen;