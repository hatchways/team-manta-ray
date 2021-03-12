const Recipe = require("../models/recipeModel");

module.exports = {
  createRecipe: async (req, res) => {
    console.log("create recipe controller reached");

    try {
      // get user from middleware
      // check if user is not chef
      if (!req.user.isChef) throw "Must be a chef to create a recipe";

      const {
        name,
        pictureUrl,
        price,
        ingredients,
        requiredStuff,
        portionDescription,
        cuisineTags,
      } = req.body;

      // Create a recipe
      const newRecipe = new Recipe({
        user: req.user._id,
        name,
        pictureUrl,
        price,
        ingredients,
        requiredStuff,
        portionDescription,
        cuisineTags,
      });

      // save
      await newRecipe.save();

      return res.status(200).json({
        success: true,
        newRecipe,
      });
    } catch (error) {
      console.log(error);

      return res.status(400).json({ error });
    }
  },

  retrieveRecipe: (req, res) => {
    console.log("retrieve recipe controller reached");

    try {
      // get the recipe from middleware
      const { recipe } = req;

      return res.status(200).json({
        success: true,
        recipe,
      });
    } catch (error) {
      console.log(error);

      return res.status(400).json({ error });
    }
  },

  updateRecipe: async (req, res) => {
    console.log("update recipe controller reached");

    try {
      // get user and recipe from middleware
      const { recipe, user } = req;

      // check if user is not a chef or he is not owner of the recipe
      // For some reasons user._id === recipe.user._id return false even if they are same
      // I think they differ on dataTypes on mongoose schema
      // I convert it toString() and condition works
      if (!user.isChef || user._id.toString() !== recipe.user._id.toString())
        throw "Must be a chef and owner of update recipe";

      const {
        name,
        pictureUrl,
        price,
        ingredients,
        requiredStuff,
        portionDescription,
        cuisineTags,
      } = req.body;

      // update recipe
      recipe.name = name;
      recipe.pictureUrl = pictureUrl;
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

      return res.status(400).json({ error });
    }
  },

  deleteRecipe: async (req, res) => {
    console.log("delete controller reached");

    try {
      // get user and recipe from middleware
      const { recipe, user } = req;

      // check if user is not a chef or he is not owner of the recipe
      // For some reasons (user._id === recipe.user._id) || (user._id == recipe.user) return false even if they are same
      // I think they differ on dataTypes on mongoose schema
      // I convert it toString() and condition works
      if (!user.isChef || user._id.toString() !== recipe.user._id.toString())
        throw "Must be a chef and owner of delete recipe";

      const recipeId = recipe._id;

      // delete recipe
      await recipe.delete();

      return res.status(200).json({
        success: true,
        message: `Recipe with id ${recipeId} has been deleted`,
      });
    } catch (error) {
      console.log({ error });

      return res.status(400).json({ error });
    }
  },

  getAllRecipesByChef: async (req, res) => {
    console.log("get all recipes by chef controller reached");

    try {
      // get the chefId from params
      const userId = req.params.chefId;

      // find all recipes of chef
      const allRecipesByChef = await Recipe.find()
        .populate({
          path: "User",
          match: {
            _id: userId,
          },
        })
        .exec();

      // if no recipes founds
      if (allRecipesByChef.length < 1)
        return res.status(200).json({
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
        error,
      });
    }
  },
};
