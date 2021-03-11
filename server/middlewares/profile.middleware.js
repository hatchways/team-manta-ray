const Profile = require("../models/profile.model");

module.exports = {
  getProfile: async (req, res, next) => {
    console.log("get profile middleware reached");

    try {
      //get userId from middleware
      const userId = req.user._id;

      // find profile by user._id
      const profile = await Profile.find()
        .populate({
          path: "User",
          match: {
            _id: userId,
          },
        })
        .exec();

      if (profile.length < 1) throw "Profile not found";

      // save the profile inside the req.profile
      req.profile = recipe;

      next();
    } catch (error) {
      console.log(error);

      return res.status(404).json(error);
    }
  },
};
