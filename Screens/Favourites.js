import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import LargeRecipeCard from '../components/LargeRecipeCard';

const Favourites = () => {
  const favourites = useSelector((state)=>state.recipeReducer.favourites)
  return (
    <View>
      <Text className = "mt-10 ml-[17px] text-[40px]">Your</Text>

      <Text className = "mt-2 ml-[17px] text-[40px]"><Text className = "mt-2 ml-[17px] text-[40px] text-[#FC8019] font-bold">Fav</Text><Text>ourites</Text></Text>


      <ScrollView >
                {/* ///display ui */}
                <View className = "flex-1 h-max mb-14 pb-32">
                {favourites.map((recipe)=>{
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

    </View>
  );
}

export default Favourites