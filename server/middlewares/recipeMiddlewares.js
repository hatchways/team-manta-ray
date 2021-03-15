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

      if (!recipe) throw new Error({ recipe });

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
