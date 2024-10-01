import { StyleSheet, Text, View, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import Header from './Header';
import RecipeCard from './RecipeCard';
import { useSelector, useDispatch } from 'react-redux';
import { getTrendingRecipes } from '../redux/action';
import SearchRecipeCard from './SearchRecipeCard';
import axios from 'axios';
import _ from "lodash";


const SearchScreen = ({ isFocused }) => {
  const dispatch = useDispatch();
  const searchQuery = useSelector((state) => state.recipeReducer.searchQuery);
  const trendingRecipes = useSelector((state) => state.recipeReducer.trendingRecipes);
  const [searchRecipeResult, setSearchRecipeResult] = useState([]);
  console.log(trendingRecipes.length);

  const apiKey = "048a4f611f2e4d75bce953d398fbcbfd";

  const fetchSearchRecipes = async (searchQuery) => {
    try {
      const autocompleteURL = `https://api.spoonacular.com/recipes/autocomplete?number=4&query=${searchQuery}&apiKey=${apiKey}`;

      const autocompleteResponse = await axios.get(autocompleteURL);
      const suggestions = autocompleteResponse.data;



      //for img and calories
      const recipeDetails = await Promise.all(
        suggestions.map(async (suggestion) => {
          const detailUrl = `https://api.spoonacular.com/recipes/${suggestion.id}/information?includeNutrition=true&addRecipeInformation=true&apiKey=${apiKey}`;
          const detailResponse = await axios.get(detailUrl);
          const detailData = detailResponse.data;

          const calories = detailData.nutrition.nutrients.find(nutrient => nutrient.name === "Calories");
          const cal = calories ? Math.round(calories.amount) : 190;

          return {
            id: suggestion.id,
            title: suggestion.title,
            img: detailData.image,
            calories: cal,
            time: detailData.readyInMinutes

          };
        })
      );

      return recipeDetails;

    }
    catch (error) {
      console.error('Error fetching recipe suggestions:', error);
      return [];
    }

  }

  const debouncedFetch = _.debounce(async (query) => {
    if (query.length > 0) {
      const recipes = await fetchSearchRecipes(query);
      setSearchRecipeResult(recipes);
    } else {
      setSearchRecipeResult([]);
    }
  }, 500);  

  useEffect(() => {
    debouncedFetch(searchQuery);  
  }, [searchQuery]);


  return (
    <View className="bg-white h-full">
      {searchQuery.length === 0 ? (
        <View>
          <Text className="ml-3 mt-5 mb-1 text-xl font-semibold">Trending Recipes</Text>
          <ScrollView className="mb-20" showsHorizontalScrollIndicator={false}>
            {trendingRecipes.length > 0 ? (
              trendingRecipes.map((recipe) => {
                let calorieNutrient = recipe.nutrition.nutrients.find((nutrient) => nutrient.name === "Calories");
                let calories = calorieNutrient ? Math.round(calorieNutrient.amount) : 0;

                return (
                  <View className="flex-col" key={recipe.id}>
                    <SearchRecipeCard
                      id={recipe.id}
                      title={recipe.title}
                      time={recipe.readyInMinutes}
                      img={recipe.image}
                      cal={calories}
                    />
                  </View>
                );
              })
            ) : (
              <Text className ="ml-3 mt-3">Loading trending recipes...</Text>
            )}
          </ScrollView>
        </View>
      ) : searchRecipeResult.length === 0 ? (
        <View>
          <Text className="text-xl font-medium ml-4 mt-3">Searching ...</Text>
        </View>
      ) : (
        <ScrollView className="mb-20" showsHorizontalScrollIndicator={false}>
          {searchRecipeResult.map((recipe) => (
            <View className="flex-col" key={recipe.id}>
              <SearchRecipeCard
                id={recipe.id}
                title={recipe.title}
                time={recipe.time}
                img={recipe.img}
                cal={recipe.calories}
              />
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
};
export default SearchScreen;
