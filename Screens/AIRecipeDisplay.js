import { View, ScrollView, Image, Pressable } from 'react-native'
import React from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar';
import Typography from '../components/Typography/Typography';
import AntDesign from '@expo/vector-icons/AntDesign';

const AIRecipeDisplay = () => {
    const route = useRoute();
    const { recipe } = route.params;
    
    const navigation = useNavigation();
    return (
        <View className="flex-1 h-full bg-white w-full">
            <StatusBar style='light' />
            <Pressable onPress={()=>navigation.goBack()} className = "h-[45] items-center justify-center w-[45] rounded-2xl bg-white absolute top-9 left-5">
            <AntDesign name="left" size={24} color="black" />
            </Pressable>
            <Image source={{ uri: recipe.img }} className="h-[36.3%] absolute -z-10 w-full" />
            <View className=" bg-white absolute pb-[40] bottom-[-16] z-10 rounded-2xl h-[67.2%] w-[100%]">
                <ScrollView className=" px-4 ">
                <Typography variant='xl' class='pr-2  mt-7' bold>{recipe.name}</Typography>
               <Typography class='mt-4' bold>Meal type: <Typography variant='normal' class=' '> {recipe.mealType}</Typography></Typography>
                <Typography class='mt-2' ><Typography bold>Cuisine type:</Typography> {recipe.cuisineType}</Typography>
                <Typography class='mt-2'><Typography bold>Cooking time:</Typography> {recipe.cookingTime}</Typography>
                <Typography class='mt-2'><Typography bold>Ingredients required:</Typography> {recipe.ingredients.join(", ")}</Typography>
                <Typography class='mt-2 mb-1' bold>Cooking instructions:</Typography>
                {
                    recipe.instructions.length > 0 &&
                    recipe.instructions.map((item,id)=>{
                        return(
                            <View className="flex-1 " key={id}>
                                <Typography class='mt-1'>{item}</Typography>
                            </View>
                        )
                    })
                }

                </ScrollView>
            </View>

        </View>
    )
}

export default AIRecipeDisplay;