/**
 * @description Context (state) to be accessed across pages
 */

import { createContext, useReducer } from "react";
import {
  userInitialState,
  UserLoginReducer,
  UserRegisterReducer,
  UserUpdateReducer,
} from "../reducers/userReducers";

import { recipeInitialState, RecipeReducer } from "../reducers/RecipeReducer";
import { cartInitialState, CartReducer } from "../reducers/CartReducer";

const initialState = {
  ...userInitialState,
  ...cartInitialState,
  ...recipeInitialState,
};
// initial user context
export const UserContext = createContext(null);

// const to use reducer dispatch function to call actions
export const UserDispatchContext = createContext();

// function to combine reducers
const combineReducers = (...reducers) => (state = initialState, action) => {
  for (let i = 0; i < reducers.length; i++) state = reducers[i](state, action);
  return state;
};

// Context
export const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(
    combineReducers(
      UserLoginReducer,
      UserRegisterReducer,
      CartReducer,
      RecipeReducer,
      UserUpdateReducer
    ),
    initialState
  ); // User reducer function

  return (
    <UserContext.Provider value={state}>
      <UserDispatchContext.Provider value={dispatch}>
        {children}
      </UserDispatchContext.Provider>
    </UserContext.Provider>
  );
};
