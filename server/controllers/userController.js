const User = require("../models/userModel.js");
const AsyncHandler = require("express-async-handler");
const generateToken = require("../utils/generateToken");

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

module.exports = { registerUser, loginUser };
