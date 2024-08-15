import { View, Text, TouchableOpacity,Image } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native'
import TopNavBar from './Header'
import { StatusBar } from 'expo-status-bar'
import { ScrollView } from 'react-native'
import Header from './Header'
import RecipeCard from './RecipeCard'

const HomeScreen = () => {
  const categories = [
    {
      id:1,
      name:"Desserts",
      image:"https://www.themealdb.com/images/category/dessert.png"
    },
    {
      id:2,
      name:"Beef",
      image:"https://www.themealdb.com/images/category/beef.png"
    },
    {
      id:3,
      name:"Chicken",
      image:"https://www.themealdb.com/images/category/chicken.png"
    },
    {
      id:4,
      name:"Pasta",
      image:"https://www.themealdb.com/images/category/pasta.png"
    },
    {
      id:5,
      name:"Seafood",
      image:"https://www.themealdb.com/images/category/seafood.png"
    },
    {
      id:6,
      name:"Starter",
      image:"https://www.themealdb.com/images/category/starter.png"
    }
  
  ]
  const [activeCat,setActiveCat] = useState("")
  return (
    <View className = "bg-white">
      <StatusBar style='dark'/>
      <ScrollView>
        <Header/>
        <View >
        <View>
                <Text className = "mt-2 ml-[17px] text-base">Hello, Vishal! 👋</Text>
                <Text className = "mt-2 ml-4 text-[27px] mb-1 font-medium tracking-wide">Ready to <Text className="text-[#FC8019] font-bold">Cook</Text> something</Text>
                <Text className = "mt-0 ml-4 text-[27px] mb-3 font-medium tracking-wide"><Text className="text-[#FC8019] font-bold" >Delicious</Text> at Home?</Text>
                 
                
              </View>
            
        <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}>
          {categories.map((cat,index)=>{
            let isActive = cat.name;
            let setActiveColor
            return(
             <SafeAreaView>
              
              <TouchableOpacity
              key={index}
              className = "flex flex-row mx-1 my-2"
              onPress={()=>setActiveCat(cat.name)}

              >
                <View className = "flex flex-row space-x-0 rounded-3xl align-middle justify-stretch border-amber-600 bg-amber-50 border-2 h-[40px] w-[100px]">
                  <Image source={{uri:cat.image}}
                  className = "rounded-full h-9 w-9 ml-0 "
                  >
                    

                  </Image>
                  <Text className = "py-2 px-1 font-medium font text-[13px] ">{cat.name}</Text>
                </View>

              </TouchableOpacity>
              </SafeAreaView>
            )
          }

        )}
        </ScrollView>
        <Text className = "ml-3 mt-2 text-lg font-semibold">Popular Recipes</Text>
        <RecipeCard/>
        </View>
        </ScrollView>
    </View>
  )
}

export default HomeScreen;