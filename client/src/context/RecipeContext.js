import React, { createContext, useReducer } from "react";
import { initialState, RecipeReducer } from "../reducers/RecipeReducer";

export const RecipeContext = createContext(null);
export const RecipeDispatchContext = createContext();

const RecipeContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(RecipeReducer, initialState);

  return (
    <RecipeContext.Provider value={state}>
      <RecipeDispatchContext.Provider value={dispatch}>
        {children}
      </RecipeDispatchContext.Provider>
    </RecipeContext.Provider>
  );
};

export default RecipeContextProvider;
