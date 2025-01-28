import { View, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";


import LargeRecipeCard from "../components/LargeRecipeCard";
import Typography from "../components/Typography/Typography";
import { useAuth } from "../Contexts/AuthContext";
import Animated, {
  
  SlideInDown

} from "react-native-reanimated";
import { RecipeTypes } from "../types/recipe";

const Favourites = () => {
  const {profile} = useAuth();
  const [favRecipes,setFavRecipes] = useState<any>(profile?.favourite_recipes?profile.favourite_recipes:[])

  useEffect(()=>{
    
    setFavRecipes(profile?.favourite_recipes);
  },[profile])

  if(!favRecipes || favRecipes?.length === 0){
    return(
      
      <View className="flex-1 px-0 bg-white">
        <Typography bold class="mt-14 ml-[17px] text-[40px] ">
        Your
      </Typography>

      <Typography bold class="mt-[-10] ml-[17px] text-[40px]">
        <Typography bold class="mt-2 ml-[17px] text-[40px] text-[#FC8019] ">
          Fav
        </Typography>
        <Typography bold class="text-[40px]">ourites</Typography>
      </Typography>

        <Typography variant="normal" bold class="text-center px-5 mt-[200]">No recipes have been added to your favorites yet. Tap the heart icon on a recipe to save it to your favorites!</Typography>
      </View>
    )
  }
  return (
    <View className= "flex-1 bg-white h-full">
      <Typography bold class="mt-14 ml-[17px] text-[40px] ">
        Your
      </Typography>

      <Typography bold class="mt-[-10] ml-[17px] text-[40px]">
        <Typography bold class="mt-2 ml-[17px] text-[40px] text-[#FC8019] ">
          Fav
        </Typography>
        <Typography bold class="text-[40px]">ourites</Typography>
      </Typography>

      <ScrollView>
        {/* ///display ui */}
        <View className="flex-1 h-max pb-10 mt-[-20]">
          {favRecipes?.length > 0 && favRecipes.map((recipe:RecipeTypes,index:number) => {
            

            return (
              <Animated.View
              entering={SlideInDown.springify()
                .damping(17)
                .mass(0.9)
                .delay(index * 100)}
                  >
              <LargeRecipeCard
                key={recipe.id}
                recipe={recipe}
                isFav={true}
              />
              </Animated.View>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};

export default Favourites;
