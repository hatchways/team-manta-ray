import axios from "axios";
import {
  CREATE_RECIPE_REQUEST,
  CREATE_RECIPE_SUCCESS,
  CREATE_RECIPE_FAIL,
  EDIT_RECIPE,
  GET_RECIPE,
  DELETE_RECIPE,
  GET_RECIPES_BY_CHEF,
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
    if (res.status === 201) {
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
  try {
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
    const res = await axios.put(
      `/api/recipes/${payload._id}`,
      formData,
      config
    );
    if (res.status === 200) {
      dispatch({ type: EDIT_RECIPE, payload });
    }
  } catch (error) {}
};

export const deleteRecipe = async (dispatch, recipeId) => {
  try {
    const res = await axios.delete(`/api/recipes/${recipeId}`);
    if (res.status === 200) {
      dispatch({ type: DELETE_RECIPE, payload: recipeId });
    }
  } catch (error) {}
};

export const getRecipesByChef = async (dispatch, chefId) => {
  try {
    const res = await axios.get(`/api/recipes/chef/${chefId}`);
    if (res.status === 200) {
      dispatch({ type: GET_RECIPES_BY_CHEF, payload: res.data });
    }
  } catch (error) {}
};

export const getRecipeById = async (dispatch, recipeId) => {
  try {
    const res = await axios.get(`/api/recipes/${recipeId}`);
    if (res.status === 200) {
      dispatch({ type: GET_RECIPE, payload: res.data });
    }
  } catch (error) {}
};
