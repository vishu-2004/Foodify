import { RecipeTypes } from "../types/recipe";

export const GET_POPULAR_RECIPES = 'GET_POPULAR_RECIPES';
export const GET_POPULAR_RECIPES_SUCCESS = 'GET_POPULAR_RECIPES_SUCCESS'
export const GET_POPULAR_RECIPES_ERROR = 'GET_POPULAR_RECIPES_ERROR'

export const GET_TRENDING_RECIPES = 'GET_TRENDING_RECIPES';
export const GET_TRENDING_RECIPES_SUCCESS = 'GET_TRENDING_RECIPES_SUCCESS'
export const GET_TRENDING_RECIPES_ERROR = 'GET_TRENDING_RECIPES_ERROR'

export const GET_RECOMMENDED_RECIPES = 'GET_RECOMMENDED_RECIPES';
export const GET_RECOMMENDED_RECIPES_SUCCESS = 'GET_RECOMMENDED_RECIPES_SUCCESS'
export const GET_RECOMMENDED_RECIPES_ERROR = 'GET_RECOMMENDED_RECIPES_ERROR'
//SEARCH FUNCTIONALITY
export const SET_SEARCH_FOCUS = 'SET_SEARCH_FOCUS';
export const SET_SEARCH_QUERY = 'SET_SEARCH_QUERY';

//favourites
export const ADD_TO_FAVOURITES = 'ADD_TO_FAVOURITES';
export const REMOVE_FROM_FAVOURITES = 'REMOVE_FROM_FAVOURITES';
export const SET_CURRENT_API_KEY_INDEX = 'SET_CURRENT_API_KEY_INDEX';


export const getPopularRecipes = ()=>({
    type: GET_POPULAR_RECIPES
});

export const getPopularRecipesSuccess = (recipes:RecipeTypes)=>({
    type: GET_POPULAR_RECIPES_SUCCESS,
    payload:recipes
});
export const getPopularRecipesError = (error:any) =>({
    type: GET_POPULAR_RECIPES_ERROR,
    payload: error
    
});

export const getTrendingRecipes = ()=>({
    type: GET_TRENDING_RECIPES
});

export const getTrendingRecipesSuccess = (recipes:RecipeTypes)=>({
    type: GET_TRENDING_RECIPES_SUCCESS,
    payload:recipes
});
export const getTrendingRecipesError = (error:any) =>({
    type: GET_TRENDING_RECIPES_ERROR,
    payload: error
    
});

export const getRecommendedRecipes = ()=>({
    type: GET_RECOMMENDED_RECIPES
});

export const getRecommendedRecipesSuccess = (recipes:RecipeTypes)=>({
    type: GET_RECOMMENDED_RECIPES_SUCCESS,
    payload:recipes
});
export const getRecommendedRecipesError = (error:any) =>({
    type: GET_RECOMMENDED_RECIPES_ERROR,
    payload: error
    
});

//SEARCH FUNCTIONALITY
export const setSearchQuery = (text:string) =>({
    type: SET_SEARCH_QUERY,
    payload: text
    
});
export const setSearchFocus = (focusState:any) => {
    return {
      type: SET_SEARCH_FOCUS,
      payload: focusState,
    };
  };

//favourites

export const addToFavourites = (item:RecipeTypes)=>{
    return{
        type:ADD_TO_FAVOURITES,
        payload: item
    };
};

export const removeFromFavourites = (item:RecipeTypes)=>{
    return{
        type:REMOVE_FROM_FAVOURITES,
        payload: item
    };
};


export const setCurrentApiKeyIndex = (index:number) => ({
  type: SET_CURRENT_API_KEY_INDEX,
  payload: index
});