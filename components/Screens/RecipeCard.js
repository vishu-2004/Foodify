import { View, Text, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import Feather from '@expo/vector-icons/Feather';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Entypo from '@expo/vector-icons/Entypo';

const RecipeCard = ({ title, time, id, img ,cal}) => {
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
      >
        {/* Image container */}
        <View className="h-[65%] w-full justify-center align-middle relative">
          <TouchableOpacity className="absolute top-1 right-1 z-10 opacity-90 items-center bg-white p-1 py-[5] rounded-full">
            <EvilIcons name="heart" size={29} color="red" />
          </TouchableOpacity>
          <Image 
            className="w-[218px] h-full object-cover rounded-2xl" 
            source={{ uri: img }} 
          />
        </View>

        {/* Details container */}
        <View className="bg-white w-full h-[35%] mt-[5]">
          <Text className="text-[16px] ml-2 font-semibold">{title}</Text>
          <View className="ml-2 mt-2 flex-row items-center opacity-60">
            <Feather name="clock" size={18} color="black" />
            <Text className="ml-1  text-[14px]">{time} min</Text>
            <Entypo name="dot-single" size={24} color="black" />
            <View className = "opacity-90 flex-row">
              <FontAwesome6 name="fire" size={17} color="black" />
              <Text className = "ml-1 ">{cal} cal</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}


export default RecipeCard;
