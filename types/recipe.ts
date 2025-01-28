

export type NutrientsType = {
    "name": string,
    "amount": number,
    "unit": string,
    "percentOfDailyNeeds": number
}



export interface RecipeTypes {
  vegetarian: boolean;
  vegan: boolean;
  glutenFree: boolean;
  dairyFree: boolean;
  veryHealthy: boolean;
  cheap: boolean;
  veryPopular: boolean;
  sustainable: boolean;
  lowFodmap: boolean;
  weightWatcherSmartPoints: number;
  gaps: string;
  preparationMinutes: number | null;
  cookingMinutes: number | null;
  aggregateLikes: number;
  healthScore: number;
  creditsText: string;
  license: string;
  sourceName: string;
  pricePerServing: number;
  extendedIngredients:ExtendedIngredient[];
  id: number;
  title: string;
  readyInMinutes: number;
  servings: number;
  sourceUrl: string;
  image: string;
  imageType: string;
  nutrition: any;
  summary: string;
  cuisines: string[];
  dishTypes: string[];
  diets: string[];
  occasions: string[];
  instructions: string;
  analyzedInstructions: any[];
  originalId: number | null;
  spoonacularScore: number;
  spoonacularSourceUrl: string;
}
export interface ExtendedIngredient {
    id: number;
    aisle: string;
    image: string;
    consistency: string;
    name: string;
    nameClean: string;
    original: string;
    originalName: string;
    amount: number;
    unit: string;
    meta: string[];
    measures: {
      us: Measure;
      metric: Measure;
    };
  }
  
  export interface Measure {
    amount: number;
    unitShort: string;
    unitLong: string;
  }
  
  export interface AiRecipeTypes {
    name: string; 
    mealType: string; 
    cuisineType: string; 
    cookingTime: number; 
    ingredients: string[]; 
    instructions: string[]; 
    img? : string;
  }
  