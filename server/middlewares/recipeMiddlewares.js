const Recipe = require("../models/recipeModel");

module.exports = {
  getRecipe: async (req, res, next) => {
    try {
      const { recipeId } = req.params;

      // find recipe by id
      const recipe = await Recipe.findById(recipeId)
        .populate({
          path: "user",
          populate: {
            path: "user",
            select: "-password", // exclude password
          },
        })
        .exec();
      //These lines will mess with recipe model when editing a recipe.

      if (!recipe)
        return res.status(404).json({
          success: false,
          error: "Recipe not found.",
        });

      // save the recipe inside the req.recipe
      req.recipe = recipe;

      next();
    } catch (error) {
      console.log(error);

      return res.status(503).json({
        success: false,
        error: error.message,
      });
    }
  },
};
