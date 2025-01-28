
import { combineReducers } from "redux";
import { recipeReducer } from "./recipeReducer";

const rootReducer = combineReducers({
  recipeReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
