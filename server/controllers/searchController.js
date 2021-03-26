const Recipe = require("../models/recipeModel");
const User = require("../models/userModel");

/**
 * @description Filter through and retrieve recipes or chefs based on filters
 * @route GET /api/search
 * @access Public
 * @params Please refer to the README.md in /server for information on how to use it
 */
const getFiltered = async (req, res) => {
  try {
    const mongoQuery = {};
    let filteredOutput = {};

    const cuisinesTagsParam = req.query.cuisines
      ? JSON.parse(req.query.cuisines)
      : [];

    const getChefsParam = req.query.chefs ? JSON.parse(req.query.chefs) : false;

    const locationParam = req.query.location
      ? JSON.parse(req.query.location)
      : undefined; //Coordinates of user making the search in [lng,lat] format

    const maxDistanceParam = req.query.maxdistance
      ? JSON.parse(req.query.maxdistance)
      : 0; // Max radius in km

    const sortByParam = req.query.sortby ? req.query.sortby : undefined;

    const orderParam = req.query.order ? req.query.order : "asc";

    //Filter for matching cuisine tags
    if (cuisinesTagsParam.length > 0) {
      mongoQuery.cuisineTags = { $in: cuisinesTagsParam };
    }

    //Max distance filtering for chefs
    if (getChefsParam && locationParam && maxDistanceParam) {
      //The $centerSphere operator accepts the radius in radians, which can be found by dividing the maxdistance by the circumference of the earth
      const radius = maxDistanceParam / 6378;
      const lng = locationParam[0];
      const lat = locationParam[1];
      mongoQuery.location = {
        $geoWithin: { $centerSphere: [[lng, lat], radius] },
      };
    }

    //Pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 12; //Results per page
    const skip = (page - 1) * limit;

    //Determine whether to return chefs or recipes
    if (getChefsParam) {
      filteredOutput = await User.find(mongoQuery).skip(skip).limit(limit);
    } else {
      //To sort or not to sort
      if (sortByParam === "price") {
        filteredOutput = await Recipe.find(mongoQuery)
          .sort({ price: orderParam === "asc" ? 1 : -1 })
          .skip(skip)
          .limit(limit);
      } else {
        filteredOutput = await Recipe.find(mongoQuery).skip(skip).limit(limit);
      }
    }

    return res.status(200).json({
      success: true,
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
