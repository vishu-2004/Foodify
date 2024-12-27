import { call, put, takeLatest } from 'redux-saga/effects';
import { 
  GET_POPULAR_RECIPES,
  getPopularRecipesSuccess,
  getPopularRecipesError, 
  getTrendingRecipesSuccess, 
  getTrendingRecipesError, 
  GET_TRENDING_RECIPES, 
  GET_RECOMMENDED_RECIPES,
  getRecommendedRecipesError,
  getRecommendedRecipesSuccess 
} from './action';

// Store your API keys in an array
const API_KEYS = [
  "521f9afe181e4f82bada0f717fa2283c",
  "c1c7bf80fce74634ae18b9271af99c50",
  "048a4f611f2e4d75bce953d398fbcbfd",
  
];

// Function to find a working API key
function* findWorkingApiKey(baseUrl) {
  for (let i = 0; i < API_KEYS.length; i++) {
    const apiKey = API_KEYS[i];
    const url = baseUrl.replace(/apiKey=([^&]+)/, `apiKey=${apiKey}`);
    
    try {
      const response = yield call(fetch, url);
      const data = yield response.json();
      
      // Check if the API call was successful
      if (!data.error && data.code !== 402) {
        return { apiKey, url, data };
      }
    } catch (error) {
      console.log(`Error with API key ${apiKey}:`, error);
    }
  }
  
  // If no working key is found
  return null;
}

function* getPopularRecipes() {
  const baseUrl = `https://api.spoonacular.com/recipes/complexSearch?apiKey=PLACEHOLDER_KEY&cuisine=italian&cuisine=asian&addRecipeInformation=true&number=10&addRecipeNutrition=true&instructionsRequired=true&addRecipeInstructions=true&ignorePantry=true&fillIngredients=true`;

  const result = yield call(findWorkingApiKey, baseUrl);
  
  if (result) {
    try {
      yield put(getPopularRecipesSuccess(result.data.results));
    } catch (error) {
      yield put(getPopularRecipesError("Unable to fetch popular recipes"));
    }
  } else {
    yield put(getPopularRecipesError("No working API keys found"));
  }
}

function* getTrendingRecipes() {
  const baseUrl = `https://api.spoonacular.com/recipes/random?apiKey=PLACEHOLDER_KEY&number=7&includeNutrition=true&include-tags=vegetarian&instructionsRequired=true&addRecipeInstructions=true&ignorePantry=truefillIngredients=true`;

  const result = yield call(findWorkingApiKey, baseUrl);
  
  if (result) {
    try {
      console.log(result.data.recipes)
      const trendingRecipes = result.data.recipes.filter(recipe => recipe.title.length <= 50);
      yield put(getTrendingRecipesSuccess(trendingRecipes));
    } catch (error) {
      yield put(getTrendingRecipesError("Unable to fetch trending recipes"));
    }
  } else {
    yield put(getTrendingRecipesError("No working API keys found"));
  }
}

function* getRecommendedRecipes() {
  const baseUrl = `https://api.spoonacular.com/recipes/complexSearch?apiKey=PLACEHOLDER_KEY&cuisine=indian&addRecipeInformation=true&number=8&addRecipeNutrition=true&instructionsRequired=true&addRecipeInstructions=true&ignorePantry=true&fillIngredients=true`;

  const result = yield call(findWorkingApiKey, baseUrl);
  
  if (result) {
    try {
      const recommendedRecipes = result.data.results.filter(recipe => recipe.title.length <= 50);
      yield put(getRecommendedRecipesSuccess(recommendedRecipes));
    } catch (error) {
      yield put(getRecommendedRecipesError("Unable to fetch recommended recipes"));
    }
  } else {
    yield put(getRecommendedRecipesError("No working API keys found"));
  }
}

function* SagaData() {
  yield takeLatest(GET_POPULAR_RECIPES, getPopularRecipes);
  yield takeLatest(GET_TRENDING_RECIPES, getTrendingRecipes);
  yield takeLatest(GET_RECOMMENDED_RECIPES, getRecommendedRecipes);
}

export default SagaData;