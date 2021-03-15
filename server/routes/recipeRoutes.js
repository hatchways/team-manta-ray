const express = require("express");
const router = express.Router();

// MIDDLEWARES
const { auth } = require("../middlewares/authMiddlewares");
const { getRecipe } = require("../middlewares/recipeMiddlewares");

// CONTROLLERS
const {
  createRecipe,
  retrieveRecipe,
  updateRecipe,
  deleteRecipe,
  getAllRecipesByChef,
} = require("../controllers/recipeController");

router.route("/").post(auth, createRecipe); // create recipes

router.route("/:recipeId").get(auth, getRecipe, retrieveRecipe); // get recipes by recipe._id

router.route("/:recipeId").put(auth, getRecipe, updateRecipe); // update recipe by recipe._id

router.route("/:recipeId").delete(auth, getRecipe, deleteRecipe); // delete recipe by recipe._id

router.route("/chef/:chefId").get(auth, getAllRecipesByChef); // get all recipes by user._id

module.exports = router;
