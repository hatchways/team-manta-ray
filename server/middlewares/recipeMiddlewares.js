const Recipe = require("../models/recipeModel");

module.exports = {
  getRecipe: async (req, res, next) => {
    console.log("get recipe middleware reached");

    try {
      const { recipeId } = req.params;

      // find recipe by id
      const recipe = await Recipe.findById(recipeId)
        .populate({
          path: "user",
          select: "-password", //exclude password
        })
        .exec();

      if (!recipe) throw "Recipe not found";

      // save the recipe inside the req.recipe
      req.recipe = recipe;

      next();
    } catch (error) {
      console.log(error);

      return res.status(404).json({ error });
    }
  },
};
