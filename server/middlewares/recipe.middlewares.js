const Recipe = require("../models/recipe.model");

module.exports = {
  getRecipe: async (req, res, next) => {
    console.log("get recipe middleware reached");

    try {
      const recipeId = req.params.id;

      // find recipe by id
      const recipe = await Recipe.findById(recipeId).populate("User").exec();

      if (recipe.length < 1) throw "Recipe not found";

      // save the recipe inside the req.recipe
      req.recipe = recipe;

      next();
    } catch (error) {
      console.log(error);

      return res.status(404).json(error);
    }
  },
};
