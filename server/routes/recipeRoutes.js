const express = require("express");
const router = express.Router();
const { validateBody } = require("../validators");

// VALIDATORS
const { createRecipeSchema } = require("../validators/recipeValidators");

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

router.route("/:recipeId").get(auth, getRecipe, retrieveRecipe); // get recipes by recipes._id

router.route("/:recipeId").put(auth, getRecipe, updateRecipe); // update recipe by recipes._id

router.route("/:recipeId").delete(auth, getRecipe, deleteRecipe); // delete recipe by recipes._id

router.route("/chef/:chefId").get(auth, getAllRecipesByChef); // get all recipes by chef._id

module.exports = router;
