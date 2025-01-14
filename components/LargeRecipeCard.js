import { View, TouchableOpacity,Image } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react'

import { MaterialIcons } from '@expo/vector-icons';
import Feather from '@expo/vector-icons/Feather';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Entypo from '@expo/vector-icons/Entypo';

import Typography from './Typography/Typography';

const truncateSummary = (summary, maxLength) => {
  if (summary.length <= maxLength) return summary;
  const text =  summary.slice(0, maxLength) + '...';
  return text.replace(/<[^>]*>?/gm, '');
};
const LargeRecipeCard = ({recipe,isFav}) => {
  const maxLength = 55;
  const truncatedSummary = truncateSummary(recipe.summary,maxLength)
  let calorieNutrient = recipe.nutrition.nutrients.find(nutrient => nutrient.name === "Calories");
  const navigation = useNavigation();
  const [isFavourite,setIsFavourite] = useState(isFav);

  useEffect(()=>{
    setIsFavourite(isFav);
    
  },[isFav])

  let calories = calorieNutrient ? Math.round(calorieNutrient.amount) : 0;
  return (
    <View className="items-center mb-[-20]">
      <TouchableOpacity className = "bg-white shadow-xl flex-row p-2 h-[160px] w-[95%] items-center rounded-3xl mt-8"
      style={{
          shadowColor: '#000',        
          shadowOffset: { width: 0, height: 3 },
          shadowOpacity: 0.5,        
          shadowRadius: 5,           
          elevation: 3,              
        }}
        
        onPress={() => {
          
           navigation.navigate('RecipeDetailsScreen', {recipe,isFav:isFavourite})}}
      >
        {/* heart icon  */}
        <TouchableOpacity className="absolute top-4 left-3 z-10 opacity-90 items-center bg-white p-2 py-[6] rounded-full">
          {isFav == true?
            <MaterialIcons name="favorite" size={24} color="#FF007A" />
            :
            <MaterialIcons name="favorite-border" size={24} color="red" />
          }
            
          </TouchableOpacity>
        {/* image container */}
        <View className = "w-[30%] h-full rounded-3xl items-center mr-11  justify-center ml-2">
            <Image className = "h-[140] w-[150] ml-6 object-cover  rounded-3xl" source={{uri:recipe.image}}/>
        </View>
        {/* details container  */}
        <View className = "w-[56.7%] 0 h-full mt-2">
            <Typography variant='normal' bold className = " text-gray-900">{recipe.title}</Typography>
            <Typography variant='xsm' className = " opacity-60 mt-2 ">{truncatedSummary}</Typography>
            {/* time and calories */}
            <View className=" mt-2 flex-row items-center opacity-60">
            <Feather name="clock" size={17} color="black" />
            <Typography variant='xsm' className="ml-1 mt-[2px]  ">{recipe.readyInMinutes} min</Typography>
            <Entypo name="dot-single" size={24} color="black" />
            <View className = "opacity-90 flex-row">
              <FontAwesome6 name="fire" size={16} color="black" />
              <Typography variant='xsm' className="ml-1 mt-[2px]  ">{calories} kcal</Typography>
            </View>
            </View>
            {/* try now btn
            <TouchableOpacity className = "bg-orange-500 h-11  w-[130]  text-center flex-row items-center rounded-3xl p-3 mt-2 absolute top-[118] right-4" 
            style={{
              shadowColor: '#000',        
              shadowOffset: { width: 0, height: 6 },
              shadowOpacity: 0.7,        
              shadowRadius: 5,           
              elevation: 7,              
            }}
            >
              <Text className = "text-white text-[15px] ml-3 mr-2 font-bold">Try Now</Text>
              <AntDesign name="arrowright" size={21} color="white" />
            </TouchableOpacity> */}
          
        </View>



      </TouchableOpacity>
    </View>
  );
}

export default LargeRecipeCard;