const ChefProfile = require("../models/chefProfileModel");
const getCoordsFromAddress = require("../utils/geocoding");

const createChefProfile = async (req, res) => {
  try {
    // get authenticated user from middleware
    const { user } = req;

    // if authenticated user is not chef
    if (!user.isChef) throw new Error("Only chef can create chef profile");

    // if chef profile exists
    const chefProfile = await ChefProfile.find({ user: user._id }).exec();

    if (chefProfile.length > 0)
      throw new Error(
        "This chef has already a profile. Cannot create another one"
      );

    const { location, bio, profilePictureUrl, cuisineTags } = req.body;

    // convert location to coordinates
    const coordinates = await getCoordsFromAddress(location);

    // create chef profile
    const newChefProfile = new ChefProfile({
      user,
      location: {
        type: "Point",
        coordinates,
      },
      bio,
      profilePictureUrl,
      cuisineTags,
    });

    // save
    await newChefProfile.save();

    return res.status(200).json({
      success: true,
      newChefProfile,
    });
  } catch (error) {
    console.log(error);

    return res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

const retrieveChefProfile = async (req, res) => {
  try {
    // get profile from middleware
    const { chefProfile } = req;

    return res.status(200).json({
      success: true,
      chefProfile,
    });
  } catch (error) {
    console.log(error);

    return res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

const updateChefProfile = async (req, res) => {
  try {
    // get profile and user from middleware
    const { chefProfile, user } = req;

    // if authenticated user is not the owner of the profile
    if (user._id.toString() !== chefProfile.user._id.toString())
      throw new Error("You can only update your own chef profile");

    const fields = req.body;

    // Convert req.body to an array to loop all given field props
    // since the getCoordsFromAddress function returns a promise
    // use await Promise.all to await
    // If not used the chefProfile will save before the promise return from getCoordsFromAddress
    await Promise.all(
      Object.keys(fields).map(async (key) => {
        // if the field's name === 'location'
        if (key === "location") {
          // pass the location value
          const coordinates = await getCoordsFromAddress(fields[key]);

          chefProfile[key] = {
            type: "Point",
            coordinates,
          };
        } else {
          chefProfile[key] = fields[key];
        }
      })
    );

    // save the chefProfile
    await chefProfile.save();

    return res.status(200).json({
      success: true,
      updatedChefProfile: chefProfile,
    });
  } catch (error) {
    console.log(error);

    return res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

const deleteChefProfile = async (req, res) => {
  try {
    // get user and chefProfile from middleware
    const { user, chefProfile } = req;

    // if authenticated user is not the owner of the profile
    if (user._id.toString() !== chefProfile.user._id.toString())
      throw new Error("You can only delete your own chef profile");

    // delete profile
    await chefProfile.delete();

    return res.status(200).json({
      success: true,
      message: `Chef Profile with user id ${user._id} has been deleted`,
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
  createChefProfile,
  retrieveChefProfile,
  updateChefProfile,
  deleteChefProfile,
};
