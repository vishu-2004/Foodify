import { call, put, takeLatest } from 'redux-saga/effects';

import { GET_POPULAR_RECIPES,getPopularRecipesSuccess,getPopularRecipesError, getTrendingRecipesSuccess ,getTrendingRecipesError,GET_TRENDING_RECIPES, GET_RECOMMENDED_RECIPES,getRecommendedRecipesError,getRecommendedRecipesSuccess} from './action';

const count = 7;
function* getPopularRecipes(){
    const apiKey = 'xxxxx';

    const url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&sort=popularity&cuisine=italian&cuisine=asian&addRecipeInformation=true&number=7&addRecipeNutrition=true`;
    try{
        const response = yield call(fetch, url);
        const data = yield response.json();

        const popularRecipes = data.results;
        yield put(getPopularRecipesSuccess(popularRecipes));
    }
    catch(error){
        yield put(getPopularRecipesError(error.message))
    }
}
function* getTrendingRecipes(){
    const apiKey = 'c1c7bf80fce74634ae18b9271af99c50';
    const url = `https://api.spoonacular.com/recipes/random?apiKey=${apiKey}&number=7&includeNutrition=true&include-tags=vegetarian`;

    try{
        const response = yield call(fetch, url);
        const data = yield response.json();

        const trendingRecipes = data.recipes;
        yield put(getTrendingRecipesSuccess(trendingRecipes))    
    
    }
    catch(error){
        yield put(getTrendingRecipesError(error.message))
    }
}

function* getRecommendedRecipes(){
    const apiKey = 'c1c7bf80fce74634ae18b9271af99c50';
    const url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&cuisine=indian&addRecipeInformation=true&number=8&addRecipeNutrition=true`;

    try{
        let currcount = 0;
        const response = yield call(fetch, url);
        const data = yield response.json();
        if(currcount <= count  ){
        const recommendedRecipes = data.results.filter(recipe => recipe.title.length <= 50);;
        yield put(getRecommendedRecipesSuccess(recommendedRecipes))   
        currcount++;
        } 
    
    }
    catch(error){
        yield put(getRecommendedRecipesError(error.message))
    }
}
function* SagaData(){
    yield takeLatest(GET_POPULAR_RECIPES,getPopularRecipes);
    yield takeLatest(GET_TRENDING_RECIPES,getTrendingRecipes);
    yield takeLatest(GET_RECOMMENDED_RECIPES,getRecommendedRecipes);
}
export default SagaData;
