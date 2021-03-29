import axios from "axios";
import {
  CREATE_RECIPE,
  EDIT_RECIPE,
  GET_RECIPE,
  DELETE_RECIPE,
  GET_RECIPES_BY_CHEF,
  RESET_RECIPES,
} from "../constants/userConstants";

export const createRecipe = async (dispatch, payload) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await axios.post("/api/recipes", payload, config);
    if (res.data) {
      dispatch({
        type: CREATE_RECIPE,
        payload: { ...res.data.newRecipe },
      });
    }
  } catch (err) {
    console.log(err);
  }
};

export const editRecipe = async (dispatch, payload) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.put(`/api/recipes/${payload._id}`, payload, config);
    if (res.status === 200) {
      dispatch({
        type: EDIT_RECIPE,
        payload: res.data.updatedRecipe,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const deleteRecipe = async (dispatch, recipeId) => {
  try {
    const res = await axios.delete(`/api/recipes/${recipeId}`);
    if (res.status === 200) {
      dispatch({ type: DELETE_RECIPE, payload: recipeId });
    }
  } catch (error) {
    console.log(error);
  }
};

export const getRecipesByChef = async (dispatch, chefId) => {
  try {
    const res = await axios.get(`/api/recipes/chef/${chefId}`);
    if (res.status === 200) {
      dispatch({
        type: GET_RECIPES_BY_CHEF,
        payload: res.data.allRecipesByChef,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const getRecipeById = async (dispatch, recipeId) => {
  try {
    const res = await axios.get(`/api/recipes/${recipeId}`);
    if (res.status === 200) {
      dispatch({ type: GET_RECIPE, payload: res.data });
    }
  } catch (error) {}
};

export const resetRecipes = (dispatch) => {
  dispatch({ type: RESET_RECIPES });
};
