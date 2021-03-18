const UserProfile = require("../models/userProfileModel");
const getCoordsFromAddress = require("../utils/geocoding");

const createUserProfile = async (req, res) => {
  try {
    // get authenticated user from middleware
    const { user } = req;

    // if user profile exists
    const userProfile = await UserProfile.find({ user: user._id }).exec();

    if (userProfile.length > 0)
      throw new Error(
        "This user has already a profile. Cannot create another one"
      );

    const { location, about, profilePictureUrl, favCuisines } = req.body;

    // convert location to coordinates
    const coordinates = await getCoordsFromAddress(location);

    // create user profile
    const newUserProfile = new UserProfile({
      user,
      location: {
        type: "Point",
        coordinates,
      },
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
      success: false,
      error: error.message,
    });
  }
};

const retrieveUserProfile = async (req, res) => {
  try {
    // get profile from middleware
    const { userProfile } = req;

    return res.status(200).json({
      success: true,
      userProfile,
    });
  } catch (error) {
    console.log(error);

    return res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

const updateUserProfile = async (req, res) => {
  try {
    // get profile and user from middleware
    const { userProfile, user } = req;

    // if authenticated user is not the owner of the profile
    if (user._id.toString() !== userProfile.user._id.toString())
      throw new Error("You can only update your own user profile");

    const fields = req.body;

    // Convert req.body to an array to loop all given field props
    // since the getCoordsFromAddress function returns a promise
    // use await Promise.all to await
    // If not used the userProfile will save before the promise return from getCoordsFromAddress
    await Promise.all(
      Object.keys(fields).map(async (key) => {
        // if the field's name === 'location'
        if (key === "location") {
          // pass the location value
          const coordinates = await getCoordsFromAddress(fields[key]);

          userProfile[key] = {
            type: "Point",
            coordinates,
          };
        } else {
          userProfile[key] = fields[key];
        }
      })
    );

    await userProfile.save();

    return res.status(200).json({
      success: true,
      updatedUserProfile: userProfile,
    });
  } catch (error) {
    console.log(error);

    return res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

const deleteUserProfile = async (req, res) => {
  try {
    // get user and userProfile from middleware
    const { user, userProfile } = req;

    // if authenticated user is not the owner of the profile
    if (user._id.toString() !== userProfile.user._id.toString())
      throw new Error("You can only delete your own user profile");

    // delete profile
    await userProfile.delete();

    return res.status(200).json({
      success: true,
      message: `User Profile with user id ${user._id} has been deleted`,
    });
  } catch (error) {
    console.log(error);

    return res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

module.exports = {
  createUserProfile,
  retrieveUserProfile,
  updateUserProfile,
  deleteUserProfile,
};
