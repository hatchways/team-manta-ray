import axios from "axios";
import {
  CREATE_RECIPE_REQUEST,
  CREATE_RECIPE_SUCCESS,
  CREATE_RECIPE_FAIL,
  EDIT_RECIPE,
} from "../constants/RecipeConstants";

export const createRecipe = async (dispatch, payload) => {
  try {
    dispatch({
      type: CREATE_RECIPE_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const formData = {
      name: payload.name,
      price: payload.price,
      ingredients: payload.ingredients,
      requiredStuff: payload.requiredStuff,
      portionDescription: payload.portionDescription,
      cuisineTags: payload.cuisineTags,
      pictureKey: payload.pictureKey,
    };

    const res = await axios.post("/api/recipes", formData, config);
    if (res.status === 200) {
      dispatch({
        type: CREATE_RECIPE_SUCCESS,
        payload: { ...payload, id: Math.floor(Math.random() * 10000) },
      });
    }
  } catch (err) {
    dispatch({
      type: CREATE_RECIPE_FAIL,
    });
  }
};

export const editRecipe = async (dispatch, payload) => {
  dispatch({ type: EDIT_RECIPE, payload });
};

export const deleteRecipe = async (dispatch, payload) => {};

export const getRecipesByChef = async (dispatch, payload) => {};
