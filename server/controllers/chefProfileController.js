const ChefProfile = require("../models/chefProfileModel");
const AsyncHandler = require("express-async-handler");

const createChefProfile = async (req, res) => {
  try {
    console.log("create chef profile controller reached");

    // get authenticated user from middleware
    const { user } = req;

    // if authenticated user is not chef
    if (!user.isChef) throw "Only chef can create chef profile";

    // if chef profile exists
    const chefProfile = await ChefProfile.find()
      .populate({
        path: "user",
        match: {
          _id: user._id,
        },
      })
      .exec();

    if (chefProfile.length > 0)
      throw "This chef has already a profile. Cannot create another one";

    // Wiill change the location field
    // Still figuring out how to save coordinates
    const { location, bio, profilePictureUrl, cuisineTags } = req.body;

    // create chef profile
    const newChefProfile = new ChefProfile({
      user,
      location, // may throw an error
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
      error,
    });
  }
};

const retrieveChefProfile = AsyncHandler(async (req, res) => {
  console.log("retrieve chef profile controller reached");

  // get profile from middleware
  const { chefProfile } = req;

  return res.status(200).json({
    success: true,
    chefProfile,
  });
});

const updateChefProfile = async (req, res) => {
  console.log("update chef profile controller reached");

  try {
    // get profile and user from middleware
    const { chefProfile, user } = req;

    // if authenticated user is not the owner of the profile
    if (user._id.toString() !== chefProfile.user._id.toString())
      throw "Cannot update someones chef profile";

    const { location, bio, profilePictureUrl, cuisineTags } = req.body;

    // update chef profile
    // Will change the location field
    // Still figuring out how to save coordinates
    chefProfile.location = location; // may throw an error
    chefProfile.bio = bio;
    chefProfile.profilePictureUrl = profilePictureUrl;
    chefProfile.cuisineTags = cuisineTags;

    await chefProfile.save();

    return res.status(200).json({
      success: true,
      updatedChefProfile: chefProfile,
    });
  } catch (error) {
    console.log(error);

    return res.status(400).json({ error });
  }
};

const deleteChefProfile = async (req, res) => {
  try {
    console.log("delete chef profile controller reached");

    // get user and chefProfile from middleware
    const { user, chefProfile } = req;

    // if authenticated user is not the owner of the profile
    if (user._id.toString() !== chefProfile.user._id.toString())
      throw "You can only delete your own chef profile";

    // delete profile
    await chefProfile.delete();

    return res.status(200).json({
      success: true,
      message: `Chef Profile with user id ${user._id} has been deleted`,
    });
  } catch (error) {
    console.log(error);

    return res.status(400).json({ error });
  }
};

module.exports = {
  createChefProfile,
  retrieveChefProfile,
  updateChefProfile,
  deleteChefProfile,
};
