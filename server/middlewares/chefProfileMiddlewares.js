const ChefProfile = require("../models/chefProfileModel");

const getChefProfile = async (req, res, next) => {
  try {
    console.log("get chef profile middleware reached");

    //get userId from middleware
    const userId = req.user._id;

    // find profile by user._id
    const chefProfile = await ChefProfile.findOne()
      .populate({
        path: "user",
        match: {
          _id: userId,
        },
        select: "-password", // DO NOT INCLUDE PASSWORD
      })
      .exec();

    if (chefProfile.length < 1) throw "Profile not found";

    // save the chefProfile inside the req.chefProfile
    req.chefProfile = chefProfile;

    next();
  } catch (error) {
    console.log(error);

    return res.status(404).json({ error });
  }
};

module.exports = {
  getChefProfile,
};
