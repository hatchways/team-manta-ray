const Recipe = require("../models/recipeModel");
const ChefProfile = require("../models/chefProfileModel");

const getFiltered = async (req, res) => {
  try {
    const mongoQuery = {};
    let filteredOutput = {};

    const cuisinesTagsParam = req.query.cuisines
      ? JSON.parse(req.query.cuisines)
      : [];
    const getChefsParam = req.query.chefs ? JSON.parse(req.query.chefs) : false;

    //Add cuisine tags as a filter
    if (cuisinesTagsParam.length > 0) {
      mongoQuery.cuisineTags = { $in: cuisinesTagsParam };
    }

    //If asking for chefs
    if (getChefsParam) {
      filteredOutput = await ChefProfile.find(mongoQuery);
    } else {
      filteredOutput = await Recipe.find(mongoQuery);
    }

    return res.status(200).json({
      success: true,
      count: filteredOutput.length,
      data: filteredOutput,
    });
  } catch (error) {
    console.log(error);

    return res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

module.exports = { getFiltered };
