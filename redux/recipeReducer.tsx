import {
  GET_POPULAR_RECIPES,
  GET_POPULAR_RECIPES_ERROR,
  GET_POPULAR_RECIPES_SUCCESS,
  GET_TRENDING_RECIPES,
  GET_TRENDING_RECIPES_ERROR,
  GET_TRENDING_RECIPES_SUCCESS,GET_RECOMMENDED_RECIPES,GET_RECOMMENDED_RECIPES_SUCCESS,GET_RECOMMENDED_RECIPES_ERROR,
  SET_SEARCH_QUERY,
  SET_SEARCH_FOCUS,
  ADD_TO_FAVOURITES,
  REMOVE_FROM_FAVOURITES
} from "./action";

export interface RecipeState {
  loading: boolean;
  popularRecipes: any[];
  trendingRecipes: any[];
  recommendedRecipes: any[];
  favourites: any[];
  error: string | null;
  searchFocus: boolean;
  searchQuery: string;
}

const initialState:RecipeState = {
  loading: false,
  popularRecipes: [],
  trendingRecipes: [],
  recommendedRecipes:[],
  favourites:[],
  error: null,
  searchFocus:false,
  searchQuery:""

};

export const recipeReducer = (state = initialState, action:any):RecipeState => {
  switch (action.type) {
    case GET_POPULAR_RECIPES:
      return { ...state, loading: true, error: null };
    case GET_POPULAR_RECIPES_SUCCESS:
      return {
        ...state,
        loading: false,
        popularRecipes: action.payload,
        error: null,
      };
    case GET_POPULAR_RECIPES_ERROR:
      return { ...state, loading: false, error: action.payload };
    //trending
    case GET_TRENDING_RECIPES:
      return { ...state, loading: true, error: null };
    case GET_TRENDING_RECIPES_SUCCESS:
      return {
        ...state,
        loading: false,
        trendingRecipes: action.payload,
        error: null,
      };
    case GET_TRENDING_RECIPES_ERROR:
      return { ...state, loading: false, error: action.payload };

      // recommened recipes
      case GET_RECOMMENDED_RECIPES:
        return { ...state, loading: true, error: null };
      case GET_RECOMMENDED_RECIPES_SUCCESS:
        return {
          ...state,
          loading: false,
          recommendedRecipes: action.payload,
          error: null,
        };
      case GET_RECOMMENDED_RECIPES_ERROR:
        return { ...state, loading: false, error: action.payload };
      //search func
      case SET_SEARCH_FOCUS:
        return {...state , searchFocus: action.payload};
      case SET_SEARCH_QUERY:
        return {...state, searchQuery: action.payload};

      //favourites


      case ADD_TO_FAVOURITES:
        return {...state, favourites:[...state.favourites, action.payload]};

      case REMOVE_FROM_FAVOURITES:
        return {...state, favourites: state.favourites.filter((recipe)=> recipe.id != action.payload.id)};
    default:
      return state;
  }
};
