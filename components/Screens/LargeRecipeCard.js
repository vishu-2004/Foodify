import { View, Text, TouchableOpacity,Image,Button } from 'react-native'
import React from 'react'
import EvilIcons from '@expo/vector-icons/EvilIcons';
import Feather from '@expo/vector-icons/Feather';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Entypo from '@expo/vector-icons/Entypo';
import AntDesign from '@expo/vector-icons/AntDesign';

const truncateSummary = (summary, maxLength) => {
  if (summary.length <= maxLength) return summary;
  const text =  summary.slice(0, maxLength) + '...';
  return text.replace(/<[^>]*>?/gm, '');
};
const LargeRecipeCard = ({id,title,img,cal,time,summary}) => {
  const maxLength = 55;
  const truncatedSummary = truncateSummary(summary,maxLength)
  return (
    <View className="items-center mb-[-20]">
      <TouchableOpacity className = "bg-white flex-row p-2 h-[160px] w-[95%] items-center rounded-3xl mt-8"
      style={{
          shadowColor: '#000',        
          shadowOffset: { width: 0, height: 3 },
          shadowOpacity: 0.5,        
          shadowRadius: 5,           
          elevation: 5,              
        }}
      >
        {/* heart icon  */}
        <TouchableOpacity className="absolute top-3 left-3 z-10 opacity-90 items-center bg-white p-1 py-[5] rounded-full">
            <EvilIcons name="heart" size={29} color="red" />
          </TouchableOpacity>
        {/* image container */}
        <View className = "w-[30%] h-full rounded-3xl items-center mr-11  justify-center ml-2">
            <Image className = "h-[140] w-[150] ml-6 object-cover  rounded-3xl" source={{uri:img}}/>
        </View>
        {/* details container  */}
        <View className = "w-[56%] h-full mt-2">
            <Text className = "text-[17px] font-bold text-gray-900">{title}</Text>
            <Text className = "text-[13px] font-medium opacity-60 mt-2 ">{truncatedSummary}</Text>
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