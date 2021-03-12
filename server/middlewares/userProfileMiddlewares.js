const UserProfile = require("../models/userProfileModel");

const getUserProfile = async (req, res, next) => {
  try {
    console.log("get user profile middleware reached");

    //get userId from middleware
    const userId = req.user._id;

    // find profile by user._id
    const userProfile = await UserProfile.findOne()
      .populate({
        path: "user",
        match: {
          _id: userId,
        },
        select: "-password", // DO NOT INCLUDE PASSWORD
      })
      .exec();

    if (userProfile.length < 1) throw "Profile not found";

    // save the userProfile inside the req.userProfile
    req.userProfile = userProfile;

    next();
  } catch (error) {
    console.log(error);

    return res.status(404).json({ error });
  }
};

module.exports = {
  getUserProfile,
};
