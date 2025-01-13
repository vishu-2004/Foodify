import { View, Text, ScrollView, Pressable } from "react-native";
import React, { useContext, useState } from "react";
import Typography from "../components/Typography/Typography";
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';
import { StyleSheet } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { TouchableOpacity } from "@gorhom/bottom-sheet";
import Entypo from '@expo/vector-icons/Entypo';
import { ModalContext } from "../Contexts/modalContext";
import * as GoogleGenerativeAI from '@google/generative-ai';
import { WebView } from 'react-native-webview';
import { useNavigation } from "@react-navigation/native";

const PostRecipe = () => {
  const API_KEY = "AIzaSyDbmkOMskQypIvPBPnX5tRk8OuOPqSWhqY";
  const MealData = [
    { label: 'Breakfast', value: 'Breakfast' },
    { label: 'Lunch', value: 'Lunch' },
    { label: 'Snack', value: 'Snack' },
    { label: 'Dinner', value: 'Dinner' },
    { label: 'Any', value: 'Any' },

  ];
  const cuisineData = [
    { label: 'Italian', value: 'Italian' },
    { label: 'Mexican', value: 'Mexican' },
    { label: 'Indian', value: 'Indian' },
    { label: 'Chinese', value: 'Chinese' },
    { label: 'Japanese', value: 'Japanese' },
    { label: 'Any', value: 'Any' }
  ]
  const instructionData = [
    { label: 'Veg', value: 'Veg' },
    { label: 'Non-Veg', value: 'Non-Veg' },
    { label: 'Vegan', value: 'Vegan' },
    { label: 'Gluten-free', value: 'Gluten-free' },
    { label: 'Any', value: 'Any' }
  ]
  const GoalsData = [
    { label: 'High protein', value: 'High protein' },
    { label: 'Low calorie', value: 'Low calorie' },
    { label: 'Heart healthy', value: 'Heart healthy' },
    { label: 'N/A', value: 'N/A' }
  ]
  const navigation = useNavigation();
  const modalCtx = useContext(ModalContext);
  const [selectedMeal, setSelectedMeal] = React.useState(null);
  const [selectedCuisine, setSelectedCuisine] = React.useState(null);
  const [instructutions, setInstruction] = useState(null);

  const [cookingTime, setCookingTime] = useState('30');
  const [ingredients, setIngredients] = useState([]);
  const [currIngredient, setCurrIngredient] = useState('');
  const [healthGoal, setHealthGoal] = useState(null);
  const [loading,setLoading] = useState(false);

  function extractRecipe(response) {
    const lines = response.split('\n').map(line => line.trim()).filter(line => line !== '');
    const recipe = {
        name: '',
        mealType: '',
        cuisineType: '',
        cookingTime: '',
        ingredients: [],
        instructions: []
    };

    let currentSection = '';
    
    lines.forEach(line => {
        // Handle section headers
        if (line.startsWith('1. Recipe Name:')) {
            currentSection = 'name';
            recipe.name = line.replace('1. Recipe Name:', '').trim();
        } else if (line.startsWith('2. Meal Type:')) {
            currentSection = 'mealType';
            recipe.mealType = line.replace('2. Meal Type:', '').trim();
        } else if (line.startsWith('3. Cuisine Type:')) {
            currentSection = 'cuisineType';
            recipe.cuisineType = line.replace('3. Cuisine Type:', '').trim();
        } else if (line.startsWith('4. Cooking Time:')) {
            currentSection = 'cookingTime';
            recipe.cookingTime = line.replace('4. Cooking Time:', '').trim();
        } else if (line.startsWith('5. Ingredients:')) {
            currentSection = 'ingredients';
        } else if (line.startsWith('6. Instructions:')) {
            currentSection = 'instructions';
        } else if (line.startsWith('* ')) {
            // Handle bullet points
            const content = line.replace('* ', '').trim();
            if (currentSection === 'ingredients') {
                recipe.ingredients.push(content);
            } else if (currentSection === 'instructions') {
                recipe.instructions.push(content);
            }
        }
    });

    // Clean up any empty arrays
    recipe.ingredients = recipe.ingredients.filter(i => i);
    recipe.instructions = recipe.instructions.filter(i => i);

    return recipe;
}

  const generateRecipe = async () => {
    try {
      // Form validation
      if (!selectedMeal || !selectedCuisine || !instructutions || cookingTime === '' || !healthGoal || ingredients.length === 0) {
        modalCtx.openModal(
          "Incomplete Form",
          "Please fill out all the required fields before proceeding.",
          "OK"
        );
        return;
      }
      setLoading(true);
      // Join ingredients
      const recipeIngredients = ingredients.join(", ");

      // Initialize Gemini AI
      const genAI = new GoogleGenerativeAI.GoogleGenerativeAI(API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      // Construct prompt
      const prompt = `Generate a popular and well-known ${selectedMeal === "Any" ? "suitable for any meal type" : selectedMeal} recipe with ${selectedCuisine === "Any" ? "Indian" : selectedCuisine} cuisine, suitable for ${instructutions === "Any" ? "no diet restrictions" : instructutions}, and requiring ${cookingTime} min to prepare. Use the following ingredients: ${recipeIngredients} and focus on ${healthGoal === "N/A" ? "No restriction in fat and protein" : healthGoal}.  The response should include the following details, with no additional text or introduction:
1. Recipe Name: (A widely known recipe in ${selectedCuisine} cuisine)
2. Meal Type:
3. Cuisine Type:
4. Cooking Time:
5. Ingredients:
6. Instructions:
* Step 1
* Step 2
* Step 3
(maximum 7-8 steps)
Exclude any additional text or introduction.`;


      // Generate recipe
      const result = await model.generateContent(prompt);
      const recipeText = result.response.text();
      console.log('Generated Recipe: =>>>', recipeText);

      // Extract recipe data
      const recipe = extractRecipe(recipeText);
      console.log('Parsed Recipe:', recipe);

      if (!recipe.name) {
        throw new Error('Failed to generate recipe name');
      }

      // Fetch recipe image
      
      const imageapi = `https://www.googleapis.com/customsearch/v1?q=${encodeURIComponent(recipe.name)}&cx=d79ccdcfc0a414a26&key=AIzaSyByBh1qMuvJKlBr0336m_psDNiov1tckBs&searchType=image&imgSize=large`
     

      const imageResponse = await fetch(imageapi);
      console.log("Image api response=>>",imageResponse);
      const imageData = await imageResponse.json();

      if (!imageData.items || imageData.items.length === 0) {
        throw new Error('No image found for the recipe');
      }

      const regularImgUrl = imageData.items[0].link;
      console.log('Recipe Image URL:', regularImgUrl);

      Object.assign(recipe,{img:regularImgUrl});
      navigation.navigate('AiRecipeDisplay',{recipe:recipe});
      setLoading(false);
      setHealthGoal(null);
      setSelectedCuisine(null);
      setSelectedMeal(null);
      setInstruction(null);
      setCookingTime("30");
      setIngredients([]);
      setCurrIngredient('');


      

    } catch (error) {
      console.error('Error generating recipe:', error);
      modalCtx.openModal(
        "Error",
        "Failed to generate recipe. Please try again.",
        "OK"
      );
      throw error;
    }
    finally{
      setLoading(false)
    }
  };

  if(loading){
    return(<View className = "flex-1 bg-white w-full h-full">
      <View className="flex-1 justify-center items-center mt-10 w-full">
      <WebView
        source={{ uri: 'https://giphy.com/embed/oCXy0HG5tBIslG7diF' }} 
        style={styles.webview}
        allowsInlineMediaPlayback={true}
      />

      </View>

    </View>)
    
  }

  return (
    <View className="flex-1   bg-white w-full h-full">
      <ScrollView style={{ flex: 1, marginTop: 50, height: '100%', width: "100%" }}>
        <View className="flex-1 h-full w-full" >
          <Typography class=" ml-3 text-[26px]  font-PoppinsSemiBold  font-medium tracking-wide">
            Discover{" "}
            <Typography class="text-primaryOrange text-[26px] " bold>
              Delicious
            </Typography>{" "}
            recipes{" "}
          </Typography>

          <Typography class="text-[26px] ml-3 font-PoppinsSemiBold  font-medium tracking-wide">
            <Typography class="text-primaryOrange text-[26px] " bold>
              Crafted
            </Typography>{" "}
            by AI !
          </Typography>
          <View className="mt-3 pb-7  h-full w-[90%] ml-5 " >
            <Typography variant="normal" class="text-[18px] ml-[-7]" bold >Select your preferences</Typography>
            <Typography variant="smb" class="ml-1 mt-3 mb-2">Meal type</Typography>
            <Dropdown
              style={[styles.dropdown]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={MealData}
              containerStyle={{ height: 200,borderRadius:10 }}
              maxHeight={300}
              itemContainerStyle={{ paddingVertical: -30, height: 50, justifyContent: 'center', paddingBottom: -6, }}
              itemTextStyle={{ fontSize: 14 }}
              labelField="label"
              fontFamily="Poppins"
              valueField="value"
              placeholder={'Select Meal Type'}
              value={selectedMeal}
              onChange={item => {
                setSelectedMeal(item.value);
              }}
            />
            <Typography variant="smb" class="ml-1 mt-3 mb-2">Cuisine type</Typography>
            <Dropdown
              style={[styles.dropdown]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={cuisineData}
              containerStyle={{ height: 200,borderRadius:10 }}
              maxHeight={300}
              itemContainerStyle={{ paddingVertical: -30, height: 50, justifyContent: 'center', paddingBottom: -6, }}
              itemTextStyle={{ fontSize: 14 }}
              fontFamily="Poppins"
              valueField="value"
              labelField="label"
              placeholder={'Select Cuisine Type'}
              value={selectedCuisine}
              onChange={item => {
                setSelectedCuisine(item.value);
              }}
            />
            <Typography variant="smb" class="ml-1 mt-3 mb-2">Dietary instuction</Typography>
            <Dropdown
              style={[styles.dropdown]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={instructionData}
              containerStyle={{ height: 200,borderRadius:10 }}
              maxHeight={300}
              itemContainerStyle={{ paddingVertical: 0, height: 53, justifyContent: 'center', paddingBottom: -6}}
              itemTextStyle={{ fontSize: 14 }}
              fontFamily="Poppins"
              valueField="value"
              labelField="label"
              placeholder={'Select Dietary instruction'}
              value={instructutions}
              onChange={item => {
                setInstruction(item.value);
              }}
            />
            <Typography variant="smb" class="ml-1 mt-3 ">Cooking time (in min)</Typography>
            <TextInput
              placeholder="Cooking time"
              className="bg-white border-2 font-Poppins  text-base border-primaryOrange w-[100%] h-[50] rounded-2xl text-[15px] pl-3  mt-2"
              value={cookingTime}
              onChangeText={(text) => setCookingTime(text)}
              keyboardType="numeric"
            />
            <Typography variant="smb" class="ml-1 mt-3 mb-2">Health goal</Typography>
            <Dropdown
              style={[styles.dropdown]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={GoalsData}
              containerStyle={{ height: 200,borderRadius:10 }}
              maxHeight={300}
              itemContainerStyle={{ paddingVertical: 0, height: 53, justifyContent: 'center', paddingBottom: -6, }}
              itemTextStyle={{ fontSize: 14 }}
              fontFamily="Poppins"
              valueField="value"
              labelField="label"
              placeholder={'Select Health Goal'}
              value={healthGoal}
              onChange={item => {
                setHealthGoal(item.value);
              }}
            />
            <Typography variant="smb" class="ml-1 mt-3 mb-2">Ingredients</Typography>
            <View className="  justify-center gap-x-1 flex-row">
              <TextInput
                placeholder="bread, paneer etc."
                className="bg-white border-2 font-Poppins  text-base border-primaryOrange w-[77%] h-[50] rounded-2xl text-[15px] pl-3  "
                value={currIngredient}
                onChangeText={(text) => setCurrIngredient(text)}
              />
              <Pressable
                onPress={() => {
                  setIngredients([...ingredients, currIngredient])
                  setCurrIngredient('')
                }}

                className="w-[20%] h-[49]  rounded-2xl justify-center bg-primaryOrange  ">
                <Typography variant="" bold class="text-white text-[15px]  text-center">Add</Typography>
              </Pressable>

            </View>
            <View style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              gap: 10,

              paddingLeft: 6,
              padding: 14,

            }} className="gap-y-[-3]">
              {ingredients.length > 0 && ingredients.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  style={{
                    backgroundColor: 'white',
                    paddingHorizontal: 16,
                    paddingVertical: 8,
                    borderRadius: 24,
                    borderWidth: 2,
                    borderColor: '#FC8019',
                    marginTop: -5,
                    marginHorizontal: -1,
                    flexDirection: 'row'
                  }}
                  onPress={() => {
                    setIngredients(ingredients.filter((item, i) => i !== index))
                  }}
                >
                  <Typography variant="smb" class="text-primaryOrange mr-1">{item}</Typography>
                  <Entypo name="cross" size={20} color="#FC8019" />
                </TouchableOpacity>
              ))}
            </View>
            <Pressable
              className="justify-center    flex-row rounded-3xl items-center h-[53] w-[100%] bg-primaryOrange"
              onPress={() => generateRecipe()}

            >

              <Typography variant="normal" bold class="text-white text-center ">
                Generate recipe
              </Typography>
            </Pressable>




          </View>
        </View>

      </ScrollView>


    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 16,

  },
  dropdown: {
    height: 50,
    borderColor: '#FC8019',
    borderWidth: 2,
    borderRadius: 16,
    paddingHorizontal: 8,
    fontFamily: "Poppins",
    marginBottom: 2
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
    fontFamily: "Poppins"
  },
  placeholderStyle: {
    fontSize: 15,
    fontFamily: 'Poppins',
    marginLeft: 3
  },
  selectedTextStyle: {
    fontSize: 15,
    fontFamily: "Poppins",
    marginLeft: 3
  },
  webview: {
    width: 300,
    height: 300, 
  },

});
export default PostRecipe;
