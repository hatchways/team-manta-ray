const express = require("express");
const router = express.Router();

// MIDDLEWARES
const { auth } = require("../middlewares/auth.middlewares");
const { getRecipe } = require("../middlewares/recipe.middlewares");

// CONTROLLERS
const {
  createRecipe,
  retrieveRecipe,
  updateRecipe,
  deleteRecipe,
  getAllRecipesByChef,
} = require("../controllers/recipe.controllers");

router.route("/").get(auth, getAllRecipesByChef); // get all recipes by chef._id

router.route("/").post(auth, createRecipe); // create recipes

router.route("/:id").get(auth, getRecipe, retrieveRecipe); // get recipes by recipes._id

router.route("/:id").put(auth, getRecipe, updateRecipe); // update recipe by recipes._id

router.route("/:id").delete(auth, getRecipe, deleteRecipe); // delete recipe by recipes._id

module.exports = router;
