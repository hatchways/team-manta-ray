const ChefProfile = require("../models/chefProfileModel");

const getChefProfile = async (req, res, next) => {
  try {
    //get userId from params

    const { userId } = req.params;

    // find profile by user._id
    const chefProfile = await ChefProfile.findOne({
      user: userId,
    })
      .populate({
        path: "user",
        select: "-password", // DO NOT INCLUDE PASSWORD
      })
      .exec();

    if (!chefProfile)
      return res.status(404).json({
        success: false,
        error: "Chef profile not found.",
      });

    // save the chefProfile inside the req.chefProfile
    req.chefProfile = chefProfile;

    next();
  } catch (error) {
    console.log("getChefProfileMiddleware", error);

    return res.status(503).json({
      success: false,
      error: error.message,
    });
  }
};

module.exports = {
  getChefProfile,
};
