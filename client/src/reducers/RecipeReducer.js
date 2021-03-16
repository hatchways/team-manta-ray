import { CREATE_RECIPE_SUCCESS } from "../constants/RecipeConstants";

export const initialState = {
  recipes: [],
};

export const RecipeReducer = (state, action) => {
  switch (action.type) {
    case CREATE_RECIPE_SUCCESS:
      return { recipes: [action.payload, ...state.recipes] };
    default:
      return state;
  }
};
