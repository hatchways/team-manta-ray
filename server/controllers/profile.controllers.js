const Profile = require("../models/profile.model");

module.exports = {
  createProfile: async (req, res) => {
    console.log("create profile controller reached");

    try {
      // get user from middleware
      const { user } = req;

      // Wiill change the location field
      // Still figuring out how to save coordinates
      // Same with bio
      const {
        location,
        bio,
        favCuisines,
        profilePictureUrl,
        cuisineTags,
      } = req.body;

      // create profile
      const newProfile = Profile.create({
        user,
        location,
        bio,
        favCuisines,
        profilePictureUrl,
        cuisineTags,
      });

      // save
      await newProfile.save();

      return res.status(200).json({
        success: true,
        newProfile,
      });
    } catch (error) {
      console.log(error);

      return res.status(400).json(error);
    }
  },

  retrieveProfile: async (req, res) => {
    console.log("retrieve profile controller reached");

    try {
      // get profile from middleware
      const { profile } = req;

      return res.status(200).json({
        success: true,
        profile,
      });
    } catch (error) {
      console.log(error);

      return res.status(400).json(error);
    }
  },

  updateProfile: async (req, res) => {
    console.log("update profile controller reached");

    try {
      // get profile and user from middleware
      const { profile, user } = req;

      const {
        location,
        bio,
        favCuisines,
        profilePictureUrl,
        cuisineTags,
      } = req.body;

      // if user is not the owner of the profile
      if (user._id !== profile.user._id)
        throw "Cannot update another user profile";

      // update profile
      // Wiill change the location field
      // Still figuring out how to save coordinates
      // Same with bio
      profile.location = location;
      profile.bio = bio;
      profile.favCuisines = favCuisines;
      profile.profilePictureUrl = profilePictureUrl;
      profile.cuisineTags = cuisineTags;

      await profile.save();

      return res.status(200).json({
        success: true,
        updatedProfile: profile,
      });
    } catch (error) {
      console.log(error);

      return res.status(400).json(error);
    }
  },

  deleteProfile: async (req, res) => {
    console.log("delete profile controller reached");

    try {
      // get user and profile from middleware
      const { user, profile } = req;

      // if user is not the owner of the profile
      if (user._id !== profile.user._id)
        throw "Cannot delete another user profile";

      // delete profile
      await profile.delete();

      return res.status(200).json({
        success: true,
        message: `Profile with user id ${user._id} has been deleted`,
      });
    } catch (error) {
      console.log(error);

      return res.status(400).json(error);
    }
  },
};
