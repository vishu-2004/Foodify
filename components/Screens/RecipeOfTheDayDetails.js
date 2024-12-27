import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useRef, useMemo, useCallback, useState,useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

const RecipeOfTheDayDetails = () => {

    const [activeTab, setActiveTab] = useState('Ingredients');
    const [recipe,setRecipe] = useState({});

    const fetchRecipe = async () => {
        
          try {
            const response = await fetch(
              "https://api.spoonacular.com/recipes/661758/information?includeNutrition=true&apiKey=c1c7bf80fce74634ae18b9271af99c50&instructionsRequired=true&addRecipeInstructions=true&ignorePantry=true&fillIngredients=true"
            );
    
            // Check if response is okay
            if (response.ok) {
            
              const data = await response.json();
              
              setRecipe(data); // Update state with fetched recipe data
            } else {
              console.error('Failed to fetch recipe:', response.statusText);
            }
          } catch (error) {
            console.error('Error fetching recipe:', error);
          }
        
      };
    
     
      useEffect(() => {
        fetchRecipe();
        
      }, []);

   

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
  ? recipe.instructions
      .replace(/<\/?ol>/g, '')
      .replace(/<\/?li>/g, '')
      .split('.')
  : recipe.analyzedInstructions?.length 
      ? recipe.analyzedInstructions[0].steps.map(step => step.step)
      : [];


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

    return (
        <View style={styles.container}>
            <StatusBar style="dark" />

            {/* Image display */}
            <TouchableOpacity className="absolute top-12 right-5 z-10 opacity-90 items-center bg-white p-2 py-[9] rounded-full">
                <EvilIcons name="heart" size={32} color="red" />
            </TouchableOpacity>
            <View style={styles.imageContainer}>
                <Image source={{ uri: recipe.image }} style={styles.image} />
            </View>

            {/* Bottom sheet display */}
            <BottomSheet
                ref={sheetRef}
                index={1} // Initially show the bottom sheet at index 1 (50%)
                snapPoints={snapPoints}
                onChange={handleSheetChange}
            >

                <BottomSheetScrollView contentContainerStyle={styles.contentContainer}>
                    {/* Recipe Title */}
                    <Text style={styles.title}>{recipe.title}</Text>
                    <Text style={styles.description} className="opacity-70 mt-[-3]">
                        {truncatedSummary}
                    </Text>
                    <View className="pt-4 ml-0 gap-x-1 h-auto w-[90%] flex-wrap flex-row items-center gap-y-4 justify-between">
                        <View className="w-[48%] mr-1 flex-row  items-center">
                            <View className="h-12 w-12 justify-center items-center bg-orange-300 rounded-xl">
                                <FontAwesome6 name="wheat-awn" size={21} color="black" />

                            </View>
                            <Text className="ml-3 font-medium text-[15px]">{Math.round(recipe.nutrition.nutrients[4].amount)} gm Carbs</Text>

                        </View>
                        <View className="w-[48%] flex-row  items-center">
                            <View className="h-12 w-12 justify-center items-center bg-orange-300 rounded-xl">
                                <MaterialCommunityIcons name="egg-fried" size={29} color="black" />
                            </View>
                            <Text className="ml-3 font-medium text-[15px]">{Math.round(recipe.nutrition.nutrients[11].amount)} gm Carbs</Text>
                        </View>
                        <View className="w-[48%] flex-row  items-center">
                            <View className="h-12 w-12 justify-center items-center bg-orange-300 rounded-xl">
                                <FontAwesome5 name="pizza-slice" size={22} color="black" />
                            </View>
                            <Text className="ml-3 font-medium text-[15px]">{Math.round(recipe.nutrition.nutrients[2].amount)} gm Fat</Text>
                        </View>
                        <View className="w-[48%] flex-row  items-center">
                            <View className="h-12 w-12 justify-center items-center bg-orange-300 rounded-xl">
                                <FontAwesome6 name="fire" size={21} color="black" />
                            </View>
                            <Text className="ml-3 font-medium text-[15px]">{Math.round(recipe.nutrition.nutrients[0].amount)} kcal</Text>
                        </View>
                    </View>

                    {/* SWITCH BETWEEN Ingredients AND instructions */}


                    <View style={styles.tabSwitchContainer} className="bg-slate-100 mt-5 items-center ml-1  h-[57] w-[97%]  justify-between flex-row  rounded-xl">
                        <TouchableOpacity
                            style={[
                                styles.tabButton,
                                activeTab === 'Ingredients' && styles.activeTabButton
                            ]}
                            className=" h-[87%] items-center justify-center w-[49%] bg-white rounded-xl "
                            onPress={() => setActiveTab('Ingredients')}
                        >
                            <Text
                                style={[
                                    styles.tabButtonText,
                                    styles === 'Ingredients' && styles.activeTabButtonText
                                ]}
                                className="text-[16px] font-medium"
                            >
                                Ingredients
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[
                                styles.tabButton,
                                activeTab === 'Instructions' && styles.activeTabButton
                            ]}
                            className=" h-[90%] w-[49%] items-center justify-center bg-white rounded-xl"
                            onPress={() => setActiveTab('Instructions')}
                        >
                            <Text
                                style={[
                                    styles.tabButtonText,
                                    activeTab === 'Instructions' && styles.activeTabButtonText
                                ]}
                                className="text-[16px] font-medium"
                            >
                                Instructions
                            </Text>
                        </TouchableOpacity>
                    </View>


                    {/* Ingredients list */}
                    {activeTab === "Ingredients" &&
                        <View className="mt-5 mx-1">
                            {extendedIngredients.map((ingredient) => (
                                <View key={ingredient.id} style={styles.ingredientContainer}>
                                    {/* Ingredient Image */}
                                    <Image
                                        source={{ uri: `https://spoonacular.com/cdn/ingredients_100x100/${ingredient.image}` }}
                                        style={styles.ingredientImage}
                                    />
                                    {/* Ingredient Name and Metric Measure */}
                                    <View style={styles.ingredientInfo}>
                                        <Text style={styles.ingredientName}>{ingredient.name}</Text>
                                        <Text style={styles.ingredientMeasure}>
                                            {Math.round(ingredient.measures.metric.amount)} {ingredient.measures.metric.unitLong}
                                        </Text>
                                    </View>
                                </View>
                            ))}
                        </View>

                    }
                     {/* Instructions */}
        {activeTab === "Instructions" &&
          <View className="mt-5 mx-1">
            <Text style={styles.heading}>Instructions</Text>
            {formattedInstructions.map((instruction, index) => (
              <Text key={index} style={styles.instructionText}>
                {index + 1}. {instruction.trim()}
              </Text>
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
        marginTop: -78,
    },
    image: {
        height: '55%',
        width: '97%',
        borderRadius: 10,
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
