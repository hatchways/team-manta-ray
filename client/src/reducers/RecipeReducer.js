import {
  CREATE_RECIPE_SUCCESS,
  EDIT_RECIPE,
} from "../constants/RecipeConstants";

export const initialState = {
  recipes: [],
};

export const RecipeReducer = (state, action) => {
  switch (action.type) {
    case CREATE_RECIPE_SUCCESS:
      return { recipes: [action.payload, ...state.recipes] };
    case EDIT_RECIPE:
      return {
        recipes: state.recipes.map((recipe) => {
          if (recipe.id === action.payload.id) {
            return action.payload;
          } else {
            return recipe;
          }
        }),
      };
    default:
      return state;
  }
};
