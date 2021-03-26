const Recipe = require("../models/recipeModel");

const createRecipe = async (req, res) => {
  try {
    // get user from middleware
    // check if user is not chef
    if (!req.user.isChef) throw new Error("Must be a chef to create a recipe");

    let {
      name,
      recipePictureUrl,
      price,
      ingredients,
      requiredStuff,
      portionDescription,
      cuisineTags,
    } = req.body;

    //Make array for fields that need to be an array
    if (ingredients)
      ingredients = ingredients
        .split(",")
        .map((ingredient) => ingredient.trim().toLowerCase());
    if (requiredStuff)
      requiredStuff = requiredStuff
        .split(",")
        .map((stuff) => stuff.trim().toLowerCase());
    if (cuisineTags)
      cuisineTags = cuisineTags
        .split(",")
        .map((tag) => tag.trim().toLowerCase());

    // Create a recipe
    const newRecipe = new Recipe({
      user: req.user._id,
      name,
      recipePictureUrl,
      price,
      ingredients,
      requiredStuff,
      portionDescription,
      cuisineTags,
    });

    // save
    await newRecipe.save();

    return res.status(201).json({
      success: true,
      newRecipe,
    });
  } catch (error) {
    console.log(error);

    return res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

const retrieveRecipe = (req, res) => {
  try {
    // get the recipe from middleware
    const { recipe } = req;

    return res.status(200).json({
      success: true,
      recipe,
    });
  } catch (error) {
    console.log(error);

    return res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

const updateRecipe = async (req, res) => {
  try {
    // get user and recipe from middleware
    const { recipe, user } = req;

    // check if authenticated user owns the recipe
    if (user._id.toString() !== recipe.user.toString())
      throw new Error("Cannot update someones recipe");

    let {
      name,
      recipePictureUrl,
      price,
      ingredients,
      requiredStuff,
      portionDescription,
      cuisineTags,
    } = req.body;

    //Make array for fields that need to be an array
    if (ingredients)
      ingredients = ingredients
        .split(",")
        .map((ingredient) => ingredient.trim().toLowerCase());
    if (requiredStuff)
      requiredStuff = requiredStuff
        .split(",")
        .map((stuff) => stuff.trim().toLowerCase());
    if (cuisineTags)
      cuisineTags = cuisineTags
        .split(",")
        .map((tag) => tag.trim().toLowerCase());
    //--------needs to make arrays here as well-------------//

    // update recipe
    recipe.name = name;
    recipe.recipePictureUrl = recipePictureUrl;
    recipe.price = price;
    recipe.ingredients = ingredients;
    recipe.requiredStuff = requiredStuff;
    recipe.portionDescription = portionDescription;
    recipe.cuisineTags = cuisineTags;

    await recipe.save();
    return res.status(200).json({
      success: true,
      updatedRecipe: recipe,
    });
  } catch (error) {
    console.log(error);

    return res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

const deleteRecipe = async (req, res) => {
  try {
    // get user and recipe from middleware
    const { recipe, user } = req;

    // check if authenticated user owns the recipe
    if (user._id.toString() !== recipe.user.toString())
      throw new Error("Cannot delete someones recipe");

    const recipeId = recipe._id;

    // delete recipe
    await recipe.delete();

    return res.status(200).json({
      success: true,
      message: `Recipe with id ${recipeId} has been deleted`,
    });
  } catch (error) {
    console.log({ error });

    return res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

const getAllRecipesByChef = async (req, res) => {
  try {
    // get the chefId from params
    const chefId = req.params.chefId;
    // find all recipes of chef
    const allRecipesByChef = await Recipe.find({ user: chefId }).sort({
      createdAt: -1,
    });

    // if no recipes founds
    if (allRecipesByChef.length < 1)
      return res.status(404).json({
        success: false,
        message: "No recipes available for this chef",
      });

    return res.status(200).json({
      success: true,
      allRecipesByChef,
    });
  } catch (error) {
    console.log(error);

    return res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

module.exports = {
  createRecipe,
  retrieveRecipe,
  updateRecipe,
  deleteRecipe,
  getAllRecipesByChef,
};
