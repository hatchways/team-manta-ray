import React, { createContext, useReducer } from "react";
import { initialState, RecipeReducer } from "../reducers/RecipeReducer";

export const RecipeContext = createContext(initialState);
export const RecipeDispatchContext = createContext();

const RecipeContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(RecipeReducer, initialState);

  const addRecipe = (recipe) => {
    dispatch({ type: "AddRecipe", payload: recipe });
    // setRecipes([...recipes, recipe]);
  };

  const removeRecipe = (id) => {
    // setRecipes(recipes.filter((recipe) => recipe.id !== id));
  };

  return (
    <RecipeContext.Provider value={{ recipes: state.recipes }}>
      <RecipeDispatchContext.Provider value={dispatch}>
        {children}
      </RecipeDispatchContext.Provider>
    </RecipeContext.Provider>
  );
};

export default RecipeContextProvider;
