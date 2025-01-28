import {  View, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import Header from "../components/Header";

import { useSelector } from "react-redux";
import SearchRecipeCard from "../components/SearchRecipeCard";
import axios from "axios";
import _ from "lodash";
import { SharedElement } from "react-navigation-shared-element";
import Typography from "../components/Typography/Typography";
import Animated, {

  FadeInDown,
} from "react-native-reanimated";
import { RootState } from "../redux/root_reducer";
import { NutrientsType, RecipeTypes } from "../types/recipe";

const SearchScreen = () => {
 
  const searchQuery = useSelector((state:RootState) => state.recipeReducer.searchQuery);
  const trendingRecipes = useSelector(
    (state:RootState) => state.recipeReducer.trendingRecipes
  );
  const [searchRecipeResult, setSearchRecipeResult] = useState<RecipeTypes[]>([]);

  // Array of API keys
  const apiKeys = [
    "6bf7c37e89414072b05c65f6bb5726c9",
    "cbc4ab68d74a47cfa4fc53e0d52f3666", // h and r
    "ada7a0c82ca546439f94d61544f267e8",
    "1043814e88d94f0a9eaeb808a6d5cdb7",
    "6bf7c37e89414072b05c65f6bb5726c9",
  ];

  // Function to find a working API key (optimized for concurrency)
  const findWorkingApiKey = async (baseUrl:string) => {
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
        
      }
    }

    // If no working key is found
    return null;
  };

  // Function to fetch recipe suggestions
  const fetchSearchRecipes = async (searchQuery:string) => {
    try {
      const autocompleteURL = `https://api.spoonacular.com/recipes/autocomplete?number=4&query=${searchQuery}&apiKey=sample`;

      // Fetch autocomplete suggestions
      const autocompleteResponse = await findWorkingApiKey(autocompleteURL);
      const suggestions = autocompleteResponse?.data || [];

      // Fetch details for each suggestion in parallel
      const recipeDetails = await Promise.all(
        suggestions.map(async (suggestion:any) => {
          const detailUrl = `https://api.spoonacular.com/recipes/${suggestion.id}/information?includeNutrition=true&apiKey=sampleapikey`;

          const detailResponse = await findWorkingApiKey(detailUrl);
          const detailData = detailResponse?.data;

          // Extract calories or set a default value
          const calories = detailData?.nutrition?.nutrients.find(
            (n:NutrientsType) => n.name === "Calories"
          );
          const cal = calories ? Math.round(calories.amount) : 190;

          return {
            ...detailData,
            calories: cal,
          };
        })
      );

      return recipeDetails;
    } catch (error:any) {
      console.error("Error fetching recipe suggestions:", error.message);
      return [];
    }
  };

  // Debounce the fetch function for better performance
  const debouncedFetch = _.debounce(async (query:string) => {
    if (query.length > 0) {
      const recipes = await fetchSearchRecipes(query);
      setSearchRecipeResult(recipes);
    } else {
      setSearchRecipeResult([]);
    }
  }, 500); // Reduced debounce time to improve responsiveness

  // Trigger the debounced fetch on search query updates
  useEffect(() => {
    debouncedFetch(searchQuery);
  }, [searchQuery]);

  return (
    <View className="flex-1 pb-2 bg-white h-full">
      <SharedElement id="header">
        <Header autoFocus={true} />
      </SharedElement>
      {searchQuery.length === 0 ? (
        <ScrollView showsHorizontalScrollIndicator={false}>
          {trendingRecipes.length > 0 ? (
            trendingRecipes.map((recipe, index) => (
              <Animated.View
                key={recipe.id}
                entering={FadeInDown.springify()
                  .damping(17)
                  .mass(0.9)
                  .delay(index*100)} // Sequential fade-in down animation
              >
                <View className="flex-col">
                  <SearchRecipeCard recipe={recipe} />
                </View>
              </Animated.View>
            ))
          ) : (
            <Typography variant="sm" class="ml-3 mt-3">
              Loading trending recipes...
            </Typography>
          )}
        </ScrollView>
      ) : searchRecipeResult.length === 0 ? (
        <View>
          <Typography variant="xl" bold class=" ml-4 mt-3">
            Searching ...
          </Typography>
        </View>
      ) : (
        <ScrollView className="mb-20" showsHorizontalScrollIndicator={false}>
          {searchRecipeResult.map((recipe) => (
            <View className="flex-col" key={recipe.id}>
              <SearchRecipeCard recipe={recipe} />
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

export default SearchScreen;
