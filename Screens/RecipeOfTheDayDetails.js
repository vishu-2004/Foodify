import { View, Text, Image, StyleSheet, TouchableOpacity, Pressable } from 'react-native';
import React, { useRef, useMemo, useCallback, useState,useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { MaterialIcons } from '@expo/vector-icons';
import { addToFavourites, removeFromFavourites } from '../redux/action';
import { useDispatch, useSelector } from 'react-redux';
import Typography from '../components/Typography/Typography';
import Animated, { FadeInDown } from 'react-native-reanimated';

const RecipeOfTheDayDetails = ({ route }) => {

    const [activeTab, setActiveTab] = useState('Ingredients');
    const { recipe, isFav } = route.params;
    const { extendedIngredients } = recipe;
    const [isFavourite, setIsFavourite] = useState(true);
    const favourites = useSelector((state)=>state.recipeReducer.favourites)

    useEffect(()=>{
        console.log(recipe);
    },[])
    
    useEffect(() => {
        setIsFavourite(recipe.id && favourites?.some((favrecipe) => favrecipe.id === recipe.id));
    }, [recipe, favourites]);

   
   
    // Correct use of ref with useRef()
    const sheetRef = useRef(null);

    // Snap points for the bottom sheet
    const snapPoints = useMemo(() => ['62%', '87%'], []);

    // Handle changes in bottom sheet
    const handleSheetChange = useCallback((index) => {

    }, []);

    // Handle snap to specific points
    const handleSnapPress = useCallback((index) => {
        sheetRef.current?.snapToIndex(index);
    }, []);

    // Handle close bottom sheet
    const handleClosePress = useCallback(() => {
        sheetRef.current?.close();
    }, []);

    const formattedInstructions = recipe.instructions
      .replace(/<\/?ol>/g, '')
      .replace(/<\/?li>/g, '')
      .split('.')
  

    const truncateSummary = (summary, maxLength) => {

        const cleanSummary = summary.replace(/<[^>]*>?/gm, '');


        const firstFullStopIndex = cleanSummary.indexOf('.');


        if (firstFullStopIndex === -1 || firstFullStopIndex > maxLength) {
            return cleanSummary.length <= maxLength
                ? cleanSummary
                : cleanSummary.slice(0, maxLength) + '...';
        }


        return cleanSummary.slice(0, firstFullStopIndex + 1);
    };

    const data = useMemo(
        () => Array(6).fill(0).map((_, index) => `Ingredient ${index + 1}`),
        []
    );
    const renderItem = useCallback(
        (item) => (
            <View key={item} style={styles.itemContainer}>
                <Text>{item}</Text>
            </View>
        ),
        []
    );


    const maxLength = 190;
    const truncatedSummary = truncateSummary(recipe.summary, maxLength)
    const dispatch = useDispatch();

    const handleAddToFav = (recipe)=>{
        dispatch(addToFavourites(recipe));
        console.log(favourites.length);
    }
    const handleRemoveFromFav = (recipe)=>{
        dispatch(removeFromFavourites(recipe));
        console.log(favourites.length);
    }
    return (
        <View style={styles.container}>
            <StatusBar style="light" />

            {/* Image display */}
            <TouchableOpacity className="absolute top-12 right-5 z-10 opacity-90 items-center bg-white p-3 py-[9] pt-3 rounded-full"
                
            >
                {isFav && isFavourite?
                <Pressable onPress={()=>handleRemoveFromFav(recipe)}>
            <MaterialIcons name="favorite" size={29} color="#FF007A" />
            </Pressable>
            :
            <Pressable onPress={()=>handleAddToFav(recipe)}>
            <MaterialIcons name="favorite-border" size={29} color="red" />
            </Pressable>
                }
                
            </TouchableOpacity>
            <View style={styles.imageContainer}>
                <Image source={require('../assets/pancake.jpg')} style={styles.image} />
            </View>

            {/* Bottom sheet display */}
            <BottomSheet
                ref={sheetRef}
                index={0} // Initially show the bottom sheet at index 1 (50%)
                snapPoints={snapPoints}
                onChange={handleSheetChange}
            >

                <BottomSheetScrollView contentContainerStyle={styles.contentContainer}>
                    {/* Recipe Title */}
                    <Typography variant='xl' class='pr-2  mt-[-4]' bold>{recipe.title}</Typography>
                    <Typography variant='sm' className="opacity-70 mt-[8] mb-3">
                        {truncatedSummary}
                    </Typography>
                    <View className="pt-4 ml-0 gap-x-1 h-auto w-[100%] flex-wrap flex-row items-center gap-y-4 justify-between">
                        <View className="w-[48%] mr-1 flex-row  items-center">
                            <View className="h-12 w-12 justify-center items-center bg-orange-300 rounded-xl">
                                <FontAwesome6 name="wheat-awn" size={21} color="black" />

                            </View>
                            <Typography variant='sm' className="ml-2 opacity-70  ">{Math.round(recipe.nutrition.nutrients[4].amount)} gm Carbs</Typography>

                        </View>
                        <View className="w-[48%] flex-row  items-center">
                            <View className="h-12 w-12 justify-center items-center bg-orange-300 rounded-xl">
                                <MaterialCommunityIcons name="egg-fried" size={29} color="black" />
                            </View>
                            <Typography variant='sm' className="ml-2 opacity-70 ">{Math.round(recipe.nutrition.nutrients[11].amount)} gm Protein</Typography>
                        </View>
                        <View className="w-[48%] flex-row  items-center">
                            <View className="h-12 w-12 justify-center items-center bg-orange-300 rounded-xl">
                                <FontAwesome5 name="pizza-slice" size={22} color="black" />
                            </View>
                            <Typography variant='sm' className="ml-2 opacity-70 ">{Math.round(recipe.nutrition.nutrients[2].amount)} gm Fat</Typography>
                        </View>
                        <View className="w-[48%] flex-row  items-center">
                            <View className="h-12 w-12 justify-center items-center bg-orange-300 rounded-xl">
                                <FontAwesome6 name="fire" size={21} color="black" />
                            </View>
                            <Typography variant='sm' className="ml-2 opacity-70 ">{Math.round(recipe.nutrition.nutrients[0].amount)} kcal</Typography>
                        </View>
                    </View>

                    {/* SWITCH BETWEEN Ingredients AND instructions */}


                    <View style={styles.tabSwitchContainer} className="bg-slate-100 mt-4 items-center   h-[57] w-[98%]  justify-between flex-row  rounded-xl">
                        <TouchableOpacity
                            style={[
                                styles.tabButton,
                                activeTab === 'Ingredients' && styles.activeTabButton
                            ]}
                            className=" h-[87%] items-center justify-center w-[49%] bg-white rounded-xl "
                            onPress={() => setActiveTab('Ingredients')}
                        >
                            <Typography
                                style={[
                                    styles.tabButtonText,
                                    styles === 'Ingredients' && styles.activeTabButtonText
                                ]}
                                variant='sm' bold
                            >
                                Ingredients
                            </Typography>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[
                                styles.tabButton,
                                activeTab === 'Instructions' && styles.activeTabButton
                            ]}
                            className=" h-[90%] w-[49%] items-center justify-center bg-white rounded-xl"
                            onPress={() => setActiveTab('Instructions')}
                        >
                            <Typography
                                style={[
                                    styles.tabButtonText,
                                    activeTab === 'Instructions' && styles.activeTabButtonText
                                ]}
                                variant='sm' bold
                               
                            >
                                Instructions
                            </Typography>
                        </TouchableOpacity>
                    </View>


                    {/* Ingredients list */}
                    {activeTab === "Ingredients" &&
                        <View className="mt-5 mx-1">
                            {extendedIngredients.map((ingredient,index) => (
                                <Animated.View entering={FadeInDown.springify()
                                    .damping(17)
                                    .mass(0.9)
                                    .delay(index*100)} key={ingredient.id} style={styles.ingredientContainer}>
                                    {/* Ingredient Image */}
                                    <Image
                                        source={{ uri: `https://spoonacular.com/cdn/ingredients_100x100/${ingredient.image}` }}
                                        style={styles.ingredientImage}
                                    />
                                    {/* Ingredient Name and Metric Measure */}
                                    <View style={styles.ingredientInfo}>
                                        <Typography variant='sm' bold class='mb-1'>{ingredient.name}</Typography>
                                        <Typography variant='xsm'>
                                            {Math.round(ingredient.measures.metric.amount)} {ingredient.measures.metric.unitLong}
                                        </Typography>
                                    </View>
                                </Animated.View>
                            ))}
                        </View>

                    }
                     {/* Instructions */}
        {activeTab === "Instructions" &&
          <View className="mt-5 mx-1">
            <Typography variant='xl' class='text-center mb-4' bold>Instructions</Typography>
            {formattedInstructions.map((instruction, index) => (
                <Animated.View entering={FadeInDown.springify()
                    .damping(17)
                    .mass(0.9)
                    .delay(index*100)}
                    key={index}
                    >
              <Typography key={index} variant='normal' class='opacity-70 mb-1'>
                {index + 1}. {instruction.trim()}
              </Typography>
              </Animated.View>
            ))}
          </View>
        }
                </BottomSheetScrollView>
            </BottomSheet>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1 },
    imageContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: -110,
    },
    image: {
        height: '58.9%',
        width: '100%',
        
    },
    contentContainer: {
        backgroundColor: 'white',
        padding: 20,
        elevation: 50,
        borderRadius: 20,
    },
    title: {
        marginTop: -5,
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    description: {
        fontSize: 16,
        marginBottom: 20,
    },
    itemContainer: {
        padding: 10,
        marginVertical: 5,
        backgroundColor: '#f1f1f1',
        borderRadius: 8,
    },

    tabSwitchContainer: {

    },
    tabButton: {
        elevation: 1
    },
    activeTabButton: {
        backgroundColor: "#f6ad55",
    },
    tabButtonText: {

    },
    activeTabButtonText: {

    },
    ingredientContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
        backgroundColor: '#f0f0f0',
        borderRadius: 8,
        padding: 10,
    },
    ingredientImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 12,
    },
    ingredientInfo: {
        flexDirection: 'column',
    },
    ingredientName: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    ingredientMeasure: {
        fontSize: 14,
        color: '#777',
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        textAlign: 'center',
        color: '#333',
      },
      instructionText: {
        fontSize: 16,
        fontWeight: '500',
        lineHeight: 24,
        marginBottom: 12,
        color: '#555',
      },

});

export default RecipeOfTheDayDetails;
