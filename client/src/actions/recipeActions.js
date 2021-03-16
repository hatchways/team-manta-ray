import axios from "axios";
import {
  CREATE_RECIPE_REQUEST,
  CREATE_RECIPE_SUCCESS,
  CREATE_RECIPE_FAIL,
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

    const res = await axios.post("/api/recipes", payload, config);
    if (res.status === 200) {
      dispatch({
        type: CREATE_RECIPE_SUCCESS,
        payload: res.data,
      });
    }
  } catch (err) {
    dispatch({
      type: CREATE_RECIPE_FAIL,
    });
  }
};

export const editRecipe = async (dispatch, payload) => {};

export const deleteRecipe = async (dispatch, payload) => {};

export const getRecipesByChef = async (dispatch, payload) => {};
