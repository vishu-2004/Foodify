export const GET_POPULAR_RECIPES = 'GET_POPULAR_RECIPES';
export const GET_POPULAR_RECIPES_SUCCESS = 'GET_POPULAR_RECIPES_SUCCESS'
export const GET_POPULAR_RECIPES_ERROR = 'GET_POPULAR_RECIPES_ERROR'

export const GET_TRENDING_RECIPES = 'GET_TRENDING_RECIPES';
export const GET_TRENDING_RECIPES_SUCCESS = 'GET_TRENDING_RECIPES_SUCCESS'
export const GET_TRENDING_RECIPES_ERROR = 'GET_TRENDING_RECIPES_ERROR'

export const GET_RECOMMENDED_RECIPES = 'GET_RECOMMENDED_RECIPES';
export const GET_RECOMMENDED_RECIPES_SUCCESS = 'GET_RECOMMENDED_RECIPES_SUCCESS'
export const GET_RECOMMENDED_RECIPES_ERROR = 'GET_RECOMMENDED_RECIPES_ERROR'

export const getPopularRecipes = ()=>({
    type: GET_POPULAR_RECIPES
});

export const getPopularRecipesSuccess = (recipes)=>({
    type: GET_POPULAR_RECIPES_SUCCESS,
    payload:recipes
});
export const getPopularRecipesError = (error) =>({
    type: GET_POPULAR_RECIPES_ERROR,
    payload: error
    
});

export const getTrendingRecipes = ()=>({
    type: GET_TRENDING_RECIPES
});

export const getTrendingRecipesSuccess = (recipes)=>({
    type: GET_TRENDING_RECIPES_SUCCESS,
    payload:recipes
});
export const getTrendingRecipesError = (error) =>({
    type: GET_TRENDING_RECIPES_ERROR,
    payload: error
    
});

export const getRecommendedRecipes = ()=>({
    type: GET_RECOMMENDED_RECIPES
});

export const getRecommendedRecipesSuccess = (recipes)=>({
    type: GET_RECOMMENDED_RECIPES_SUCCESS,
    payload:recipes
});
export const getRecommendedRecipesError = (error) =>({
    type: GET_RECOMMENDED_RECIPES_ERROR,
    payload: error
    
});