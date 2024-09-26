import { View, Text,Image } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import EvilIcons from '@expo/vector-icons/EvilIcons';
import Feather from '@expo/vector-icons/Feather';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Entypo from '@expo/vector-icons/Entypo';

const SearchRecipeCard = ({id,title,img,cal,time}) => {
  return (
    
      <View className="items-center  flex-col">
      <TouchableOpacity className = "bg-slate-50 flex-row p-2 h-[80px] items-center  justify-center mt-3"
      
      >
       
        {/* image container */}
        <View className = "w-[30%] h-[full] rounded-3xl items-center  mt-1  justify-center ">
            <Image className = "h-[70] w-[80]  object-cover  rounded-xl" source={{uri:img}}/>
        </View>
        {/* details container  */}
        <View className = "w-[70%] h-full mt-1  mr-0">
            <Text className = "text-[17px] font-medium text-gray-900">{title}</Text>
         
            {/* time and calories */}
            <View className=" mt-2 flex-row items-center opacity-60">
            <Feather name="clock" size={17} color="black" />
            <Text className="ml-1  text-[13px]">{time} min</Text>
            <Entypo name="dot-single" size={24} color="black" />
            <View className = "opacity-90 flex-row">
              <FontAwesome6 name="fire" size={16} color="black" />
              <Text className = "ml-1 text-[13px] ">{cal} cal</Text>
            </View>
            </View>
           
          
        </View>



      </TouchableOpacity>
    </View>
    
  )
}

export default SearchRecipeCard;