const User = require("../models/userModel.js");
const AsyncHandler = require("express-async-handler");
const generateToken = require("../utils/generateToken");
const getCoordsFromAddress = require("../utils/geocoding");
const bcrypt = require("bcryptjs");

/**
 * @description Register a new user
 * @route POST /api/users/register
 * @access Public
 * @data => name, email, password, isChef(optional)
 */

const registerUser = AsyncHandler(async (req, res) => {
  const { name, email, password, isChef } = req.body;

  if (password.length <= 6) {
    res.status(400);
    throw new Error("Password length must be atleast 7 characters");
  }

  const userExist = await User.findOne({ email });

  if (userExist) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    name,
    email,
    password,
    isChef,
  });

  if (user) {
    const token = generateToken(user._id);

    res.cookie("token", token, {
      maxAge: 86400000, // 24hrs
      httpOnly: true,
    });

    //------/Temporary for Demo/-----Create a profile-------
    // if (user.isChef) {
    //   const profile = await ChefProfile.create({
    //     user: user._id,
    //   });
    // } else {
    //   const profile = await UserProfile.create({
    //     user: user._id,
    //   });
    // }

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isChef: user.isChef,
    });
  } else {
    res.status(400).send({ message: "Invalid user data" });
  }
});

/**
 * @description Login and authenticate a user
 * @route POST /api/users/login
 * @access Public
 * @data => email, password
 */

const loginUser = AsyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    const token = generateToken(user._id);

    res.cookie("token", token, {
      maxAge: 86400000,
      httpOnly: true,
    });

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isChef: user.isChef,
    });
  } else {
    res.status(401);
    throw new Error("Invalid user data");
  }
});
/**
 * @description make the current user a chef
 * @route POST /api/users/isChef
 * @access Private
 * @data => success, userInfo
 */

const makeUserAChef = AsyncHandler(async (req, res) => {
  const { user } = req;
  const currentUser = await User.findById(user._id);
  currentUser.isChef = true;
  await currentUser.save();
  res.json({ currentUser });
});

const logoutUser = AsyncHandler(async (req, res) => {
  // Set token to none and expire after 5 seconds
  res.clearCookie("token");
  res
    .status(200)
    .json({ success: true, message: "User logged out successfully" });
});

const updateUser = async (req, res) => {
  try {
    // get user from middleware
    const { user } = req;

    console.log(user);

    const fields = req.body;

    // I think we need new routes for these fields
    if (fields.email) throw new Error("Cannot update email.");
    if (fields.stripeCustomer) throw new Error("Cannot update stripe.");
    if (fields.password) throw new Error("Cannot update password.");

    // Convert req.body to an array to loop all given field props
    // use await Promise.all to await
    await Promise.all(
      Object.keys(fields).map(async (key) => {
        // if the field's name === 'location'
        if (key === "location") {
          // pass the location value
          const coordinates = await getCoordsFromAddress(fields[key]);

          user[key] = {
            type: "Point",
            coordinates,
          };
        } else {
          user[key] = fields[key];
        }
      })
    );

    // save the user
    await user.save();

    return res.status(200).json({
      success: true,
      updatedUser: user,
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
  registerUser,
  loginUser,
  makeUserAChef,
  logoutUser,
  updateUser,
};
