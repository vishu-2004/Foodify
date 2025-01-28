import { View, TouchableOpacity, Image } from 'react-native';
import React from 'react';

import Feather from '@expo/vector-icons/Feather';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Entypo from '@expo/vector-icons/Entypo';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import Typography from './Typography/Typography';
import { NutrientsType, RecipeTypes } from '../types/recipe';
import { ScreenNavigationProp } from '../navigation';

type RecipeCardProps = {
  recipe: RecipeTypes;
  isFav:boolean

}

const RecipeCard = ({recipe,isFav}:RecipeCardProps) => {
  let calorieNutrient = recipe.nutrition.nutrients.find((nutrient:NutrientsType) => nutrient.name === "Calories");
  const navigation = useNavigation<ScreenNavigationProp>();

  let calories = calorieNutrient ? Math.round(calorieNutrient.amount) : 0;
  return (
    <View>
      <TouchableOpacity 
        className="flex-col p-2 pb-6 mt-2 mb-6 w-[235px] h-[220px] mx-2 justify-center align-middle rounded-2xl bg-white shadow-sm" 
        style={{
          shadowColor: '#000',        
          shadowOffset: { width: 0, height: 3 },
          shadowOpacity: 0.5,        
          shadowRadius: 5,           
          elevation: 5,              
        }}
        onPress={() => navigation.navigate('RecipeDetailsScreen', {recipe,isFav})}
      >
        {/* Image container */}
        <View className="h-[65%] w-full justify-center align-middle relative">
          <TouchableOpacity className="absolute top-1 right-1 z-10 opacity-90 items-center bg-white p-2 py-[6] pt-2 rounded-full">
          {isFav == true?
            <MaterialIcons name="favorite" size={26} color="#FF007A" />
            :
            <MaterialIcons name="favorite-border" size={24} color="#FF007A" />
          }
          </TouchableOpacity>
          <Image 
            className="w-[218px] h-full object-cover rounded-2xl" 
            source={{ uri: recipe.image }} 
          />
        </View>

        {/* Details container */}
        <View className="bg-white w-full h-[35%] mt-[5]">
          <Typography variant='sm' bold class=" ml-2 ">{recipe.title}</Typography>
          <View className="ml-2 mt-2 flex-row items-center opacity-60">
            <Feather name="clock" size={18} color="black" />
            <Typography variant='xsm' class="ml-1 mt-[2px] ">{recipe.readyInMinutes} min</Typography>
            <Entypo name="dot-single" size={24} color="black" />
            <View className = "opacity-90 flex-row">
              <FontAwesome6 name="fire" size={17} color="black" />
              <Typography variant='xsm' class = "ml-1 mt-[2px] ">{calories} cal</Typography>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}


export default RecipeCard;
