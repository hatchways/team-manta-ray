const UserProfile = require("../models/userProfileModel");
const AsyncHandler = require("express-async-handler");

const createUserProfile = async (req, res) => {
  try {
    console.log("create user profile controller reached");

    // get authenticated user from middleware
    const { user } = req;

    // if user profile exists
    const userProfile = await UserProfile.find()
      .populate({
        path: "user",
        match: {
          _id: user._id,
        },
      })
      .exec();

    if (userProfile.length > 0)
      throw "This user has already a profile. Cannot create another one";

    // Wiill change the location field
    // Still figuring out how to save coordinates
    const { location, about, profilePictureUrl, favCuisines } = req.body;

    // create user profile
    const newUserProfile = new UserProfile({
      user,
      location, // may throw an error
      about,
      profilePictureUrl,
      favCuisines,
    });

    // save
    await newUserProfile.save();

    return res.status(200).json({
      success: true,
      newUserProfile,
    });
  } catch (error) {
    console.log(error);

    return res.status(400).json({
      error,
    });
  }
};

const retrieveUserProfile = AsyncHandler(async (req, res) => {
  console.log("retrieve user profile controller reached");

  // get profile from middleware
  const { userProfile } = req;

  return res.status(200).json({
    success: true,
    userProfile,
  });
});

const updateUserProfile = async (req, res) => {
  console.log("update user profile controller reached");

  try {
    // get profile and user from middleware
    const { userProfile, user } = req;

    // if authenticated user is not the owner of the profile
    if (user._id.toString() !== userProfile.user._id.toString())
      throw "Cannot update someones user profile";

    const { location, about, profilePictureUrl, favCuisines } = req.body;

    // update user profile
    // Will change the location field
    // Still figuring out how to save coordinates
    userProfile.location = location; // may throw an error
    userProfile.about = about;
    userProfile.profilePictureUrl = profilePictureUrl;
    userProfile.favCuisines = favCuisines;

    await userProfile.save();

    return res.status(200).json({
      success: true,
      updatedUserProfile: userProfile,
    });
  } catch (error) {
    console.log(error);

    return res.status(400).json({ error });
  }
};

const deleteUserProfile = async (req, res) => {
  try {
    console.log("delete user profile controller reached");

    // get user and userProfile from middleware
    const { user, userProfile } = req;

    // if authenticated user is not the owner of the profile
    if (user._id.toString() !== userProfile.user._id.toString())
      throw "You can only delete your own user profile";

    // delete profile
    await userProfile.delete();

    return res.status(200).json({
      success: true,
      message: `User Profile with user id ${user._id} has been deleted`,
    });
  } catch (error) {
    console.log(error);

    return res.status(400).json({ error });
  }
};

module.exports = {
  createUserProfile,
  retrieveUserProfile,
  updateUserProfile,
  deleteUserProfile,
};
