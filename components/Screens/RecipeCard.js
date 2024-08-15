import { View, Text, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import Feather from '@expo/vector-icons/Feather';

const RecipeCard = ({ title, time, id, img }) => {
  return (
    <View>
      <TouchableOpacity 
        className="flex-col p-2 mt-3 w-[55%] h-[215px] ml-3 justify-center align-middle rounded-2xl bg-white shadow-lg" 
        style={{
          shadowColor: '#000',        // Set shadow color
          shadowOffset: { width: 0, height: 4 }, // Set shadow offset
          shadowOpacity: 0.8,         // Set shadow opacity
          shadowRadius: 5,            // Set shadow radius
          elevation: 8,               // Set elevation for Android
        }}
      >
        {/* Image container */}
        <View className="h-[70%] mt-2 w-full justify-center align-middle relative">
          {/* Heart Icon */}
          <TouchableOpacity className="absolute top-1 right-1 z-10 opacity-90 bg-white p-2 rounded-full">
            <EvilIcons name="heart" size={25} color="red" />
          </TouchableOpacity>
          {/* Recipe Image */}
          <Image 
            className="w-[100%] h-full object-contain rounded-2xl" 
            source={{ uri: img }} 
          />
        </View>

        {/* Details container */}
        <View className="bg-white w-full h-[30%] text-center mt-2">
          <Text className="text-[16px] ml-2 font-semibold">{title}</Text>
          <View className="ml-2 mt-2 flex-row items-center">
            <Feather name="clock" size={16} color="black" />
            <Text className="ml-1 text-[13px]">{time} min</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}

export default RecipeCard;
