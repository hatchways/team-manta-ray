import {
  CREATE_RECIPE,
  DELETE_RECIPE,
  EDIT_RECIPE,
  GET_RECIPE,
  GET_RECIPES_BY_CHEF,
  RESET_RECIPES,
} from "../constants/userConstants";

export const recipeInitialState = {
  recipes: [],
  recipe: {},
};

export const RecipeReducer = (state, action) => {
  switch (action.type) {
    case CREATE_RECIPE:
      return { ...state, recipes: [action.payload, ...state.recipes] };
    case EDIT_RECIPE:
      return {
        ...state,
        recipes: state.recipes.map((recipe) => {
          if (recipe._id === action.payload._id) {
            return action.payload;
          } else {
            return recipe;
          }
        }),
      };
    case DELETE_RECIPE:
      return {
        ...state,
        recipes: state.recipes.filter(
          (recipe) => recipe._id !== action.payload
        ),
      };
    case GET_RECIPE:
      return {
        ...state,
        recipe: action.payload,
      };
    case RESET_RECIPES:
      return {
        ...state,
        recipes: [],
        recipe: {},
      };
    case GET_RECIPES_BY_CHEF:
      return {
        ...state,
        recipes: action.payload,
      };

    default:
      return state;
  }
};
