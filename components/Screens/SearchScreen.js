import { StyleSheet, Text, View, ScrollView } from 'react-native';
import React, { useEffect } from 'react';
import Header from './Header';
import RecipeCard from './RecipeCard';
import { useSelector, useDispatch } from 'react-redux';
import { getTrendingRecipes } from '../redux/action';
import SearchRecipeCard from './SearchRecipeCard';


const SearchScreen = ({ searchQuery, isFocused }) => {
  const dispatch = useDispatch();
  const trendingRecipes = useSelector((state) => state.recipeReducer.trendingRecipes);
console.log(trendingRecipes.length);

  
 

  return (
    <View className="bg-white h-full">
      {searchQuery.length === 0 ? (
        <View>
          <Text className="ml-3 mt-[10] mb-1 text-xl font-semibold">Trending Recipes</Text>
          <ScrollView className="mb-20"  showsHorizontalScrollIndicator={false}>
            {trendingRecipes.length > 0 ? (
              trendingRecipes.map(recipe => {
                let calorieNutrient = recipe.nutrition.nutrients.find(nutrient => nutrient.name === "Calories");
                let calories = calorieNutrient ? Math.round(calorieNutrient.amount) : 0;

                return (
                  <View className = "flex-col">
                  <SearchRecipeCard
                    key={recipe.id}
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
              <Text>Loading trending recipes...</Text>
            )}
          </ScrollView>
        </View>
      ) : (
        <View>
          <Text>Searching the web API...</Text>
        </View>
      )}
    </View>
  );
};

export default SearchScreen;
