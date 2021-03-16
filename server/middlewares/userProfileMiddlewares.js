const UserProfile = require("../models/userProfileModel");

const getUserProfile = async (req, res, next) => {
  try {
    //get userId from params
    const { userId } = req.params;

    // find profile by user._id
    const userProfile = await UserProfile.findOne({
      user: userId,
    })
      .populate({
        path: "user",
        select: "-password", // DO NOT INCLUDE PASSWORD
      })
      .exec();

    if (!userProfile)
      return res.status(404).json({
        success: false,
        error: "User profile not found.",
      });

    console.log("user profile found");
    console.log(userProfile);

    // save the userProfile inside the req.userProfile
    req.userProfile = userProfile;

    next();
  } catch (error) {
    console.log("getUserProfileMiddleware", error);

    return res.status(503).json({
      success: false,
      error: error.message,
    });
  }
};

module.exports = {
  getUserProfile,
};
