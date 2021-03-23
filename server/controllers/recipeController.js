const Recipe = require("../models/recipeModel");
const ChefProfile = require("../models/chefProfileModel");

const createRecipe = async (req, res) => {
  try {
    // get user from middleware
    // check if user is not chef
    if (!req.user.isChef) throw new Error("Must be a chef to create a recipe");

    let {
      name,
      pictureKey,
      price,
      ingredients,
      requiredStuff,
      portionDescription,
      cuisineTags,
    } = req.body;

    // we need userProfile for user objects not user
    // make sure there is chef has profile as this will throws an error
    const chefProfile = await ChefProfile.findOne({
      user: req.user._id,
    }).exec();

    if (!chefProfile)
      throw new Error("You need a chef profile first to create a recipe");

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
      user: chefProfile._id,
      name,
      pictureKey,
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

    // check if user is not a chef or he is not owner of the recipe
    // For some reasons user._id === recipe.user._id return false even if they are same
    // I think they differ on dataTypes on mongoose schema
    // I convert it toString() and condition works
    const chef = await ChefProfile.findOne({ user: user._id });
    const chefId = chef._id;

    if (!user.isChef || chefId.toString() !== recipe.user.toString())
      throw new Error("Must be a chef and owner of the recipe");

    const {
      name,
      pictureKey,
      price,
      ingredients,
      requiredStuff,
      portionDescription,
      cuisineTags,
    } = req.body;

    //--------needs to make arrays here as well-------------//

    // update recipe
    recipe.name = name;
    recipe.pictureKey = pictureKey;
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

    // check if user is not a chef or he is not owner of the recipe
    // For some reasons (user._id === recipe.user._id) || (user._id == recipe.user) return false even if they are same
    // I think they differ on dataTypes on mongoose schema
    // I convert it toString() and condition works
    const chef = await ChefProfile.findOne({ user: user._id });
    const chefId = chef._id;

    if (!user.isChef || chefId.toString() !== recipe.user.toString())
      throw new Error("Must be a chef and owner of the recipe");

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
