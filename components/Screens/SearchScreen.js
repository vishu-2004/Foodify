import { StyleSheet, Text, View, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import Header from "./Header";
import RecipeCard from "./RecipeCard";
import { useSelector, useDispatch } from "react-redux";
import SearchRecipeCard from "./SearchRecipeCard";
import axios from "axios";
import _ from "lodash";
import { SharedElement } from "react-navigation-shared-element";
import Typography from "../Typography/Typography";

const SearchScreen = () => {
  const dispatch = useDispatch();
  const searchQuery = useSelector((state) => state.recipeReducer.searchQuery);
  const trendingRecipes = useSelector(
    (state) => state.recipeReducer.trendingRecipes
  );
  const [searchRecipeResult, setSearchRecipeResult] = useState([]);

  // Array of API keys
const apiKeys = [
  "cbc4ab68d74a47cfa4fc53e0d52f3666", // h and r
  "ada7a0c82ca546439f94d61544f267e8",
  "1043814e88d94f0a9eaeb808a6d5cdb7",
  "6bf7c37e89414072b05c65f6bb5726c9",
];

// Function to find a working API key (optimized for concurrency)
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

  // If no working key is found
  return null;
};

// Function to fetch recipe suggestions
const fetchSearchRecipes = async (searchQuery) => {
  try {
    const autocompleteURL = `https://api.spoonacular.com/recipes/autocomplete?number=4&query=${searchQuery}&apiKey=sample`;

    // Fetch autocomplete suggestions
    const autocompleteResponse = await findWorkingApiKey(autocompleteURL);
    const suggestions = autocompleteResponse?.data || [];

    // Fetch details for each suggestion in parallel
    const recipeDetails = await Promise.all(
      suggestions.map(async (suggestion) => {
        const detailUrl = `https://api.spoonacular.com/recipes/${suggestion.id}/information?includeNutrition=true&apiKey=sampleapikey`;

        const detailResponse = await findWorkingApiKey(detailUrl);
        const detailData = detailResponse?.data;

        // Extract calories or set a default value
        const calories = detailData?.nutrition?.nutrients.find((n) => n.name === "Calories");
        const cal = calories ? Math.round(calories.amount) : 190;

        return {
          ...detailData,
          calories: cal,
        };
      })
    );

    return recipeDetails;
  } catch (error) {
    console.error("Error fetching recipe suggestions:", error.message);
    return [];
  }
};

// Debounce the fetch function for better performance
const debouncedFetch = _.debounce(async (query) => {
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
        <ScrollView className="pb-2">
          <Typography variant="xl" bold className="ml-3 mt-3 mb-1 ">
            Trending Recipes
          </Typography>
          <ScrollView  showsHorizontalScrollIndicator={false}>
            {trendingRecipes.length > 0 ? (
              trendingRecipes.map((recipe) => (
                <View className="flex-col" key={recipe.id}>
                  <SearchRecipeCard recipe={recipe} />
                </View>
              ))
            ) : (
              <Typography variant="sm" className="ml-3 mt-3">Loading trending recipes...</Typography>
            )}
          </ScrollView>
        </ScrollView>
      ) : searchRecipeResult.length === 0 ? (
        <View >
          <Typography variant='xl' bold className=" ml-4 mt-3">Searching ...</Typography>
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
