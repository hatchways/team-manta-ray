const Joi = require("Joi");

const createRecipeSchema = Joi.object({
  name: Joi.string().required(),
  pictureUrl: Joi.string().required(),
  price: Joi.number().required(),
  ingredients: Joi.array().items(Joi.string().required()).required(),
  requiredStuff: Joi.array().items(Joi.string().required()).required(),
  portionDescription: Joi.string().required(),
  cuisineTags: Joi.array().items(Joi.string().required()).required(),
});

module.exports = { createRecipeSchema };
