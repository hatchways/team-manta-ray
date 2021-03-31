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

    if (user.address && user.location) {
      res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isChef: user.isChef,
        address: user.address,
        location: user.location,
      });
    } else {
      res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isChef: user.isChef,
      });
    }
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
  res.clearCookie("token");
  res
    .status(200)
    .json({ success: true, message: "User logged out successfully" });
});

const retrieveUser = async (req, res) => {
  try {
    // get user from middleware
    const { user } = req;

    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.log(error);

    return res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

const updateUserData = AsyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");

  if (user) {
    const addressStr =
      req.body.address1 +
      " " +
      req.body.address2 +
      " " +
      req.body.city +
      " " +
      req.body.province +
      " " +
      req.body.zip;
    const coord = await getCoordsFromAddress(addressStr);
    user.name = req.body.name || user.name;
    user.bio = req.body.bio || user.bio;
    user.address = {
      address1: req.body.address1,
      address2: req.body.address2,
      city: req.body.city,
      province: req.body.province,
      zip: req.body.zip,
    };

    user.email;
    user.location = {
      type: "Point",
      coordinates: coord,
    };
    if (req.body.password) {
      user.password = req.body.password;
    }
    user.isChef;

    user.profilePictureUrl = req.body.profilePictureUrl;

    user.cuisines = req.body.cuisines;
  }

  const updatedUser = await user.save();
  res.json({
    success: true,
    updatedUser,
  });
});

const getUserById = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId)
      .select("-password -stripeCustomer")
      .exec();

    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.log(error);

    return res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};
//------------------CART  Controllers ---------------------------------//

const getUserCart = AsyncHandler(async (req, res) => {
  //get user from middleWare
  const { user } = req;
  try {
    if (user.cart) {
      const cartInfo = await User.findOne({ _id: user._id })
        .select("cart")
        .populate("cart.chef")
        .populate("cart.items.recipe")
        .exec();
      return res.status(200).json(cartInfo);
    }
    return res.status(200).json({ cart: { items: [] } });
  } catch (error) {
    console.log(error.message);
    res.status(500);
    throw new Error("Server Error");
  }
});

const deleteUserCart = AsyncHandler(async (req, res) => {
  const { user } = req;
  try {
    const currentUser = await User.findById(user._id);

    if (!currentUser) {
      res.status(404);
      throw new Error("User Not Found");
    }

    //find the user and remove the instance of cart

    const updatedUser = await User.findOneAndUpdate(
      { _id: user._id },
      { $unset: { cart: "" } },
      { new: true }
    );

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500);
    throw new Error("Server Error");
  }
});

const editUserCart = AsyncHandler(async (req, res) => {
  //get user from middleWare
  const { user } = req;

  //recipeId && chefId will be in body and qty is optional-only from frontend, it is a required field in model
  const { recipe, chef, qty } = req.body;

  try {
    const currentUser = await User.findById(user._id);

    if (!currentUser) {
      res.status(404);
      throw new Error("User Not Found");
    }

    const cartIsEmpty = !currentUser.cart;
    if (cartIsEmpty) {
      currentUser.cart = { chef, items: [{ recipe, qty: 1 }] };
      await currentUser.save();

      const updatedCart = await User.findById(user._id)
        .select("cart")
        .populate("cart.chef")
        .populate("cart.items.recipe");

      res.status(200).json(updatedCart.cart.items);
      return;
    }

    //if cart exist check to see that chef is not the current user
    if (chef === currentUser._id.toString()) {
      res.status(401);
      throw new Error("user cannot order from himself/herself");
    }

    //check if the chef is different than current chef in cart
    if (chef !== currentUser.cart.chef.toString()) {
      res.status(401);
      throw new Error(
        "User cannot have two chefs, first delete the previous menu"
      );
    }

    //check if recipe already exist in our cart if Yes edit the qty else add it to cart
    const isItemAlreadyInCart = currentUser.cart.items.find(
      (item) => item.recipe.toString() === recipe
    );

    if (isItemAlreadyInCart) {
      //if qty provided in body set to that, otherwise just add the qty by 1
      currentUser.cart.items = currentUser.cart.items.map((item) =>
        item.recipe.toString() === recipe
          ? { recipe, qty: qty ? qty : item.qty + 1 }
          : item
      );
    } else {
      currentUser.cart.items.unshift({ recipe, qty: 1 });
    }

    await currentUser.save();
    const updatedCart = await User.findById(user._id)
      .select("cart")
      .populate("cart.items.recipe")
      .exec();
    res.status(200).json(updatedCart.cart.items);
  } catch (error) {
    console.log(error);
    res.status(500);
    throw new Error("Server Error");
  }
});

const deleteAnItemFromCart = AsyncHandler(async (req, res) => {
  const { recipeId } = req.params;
  const { user } = req;
  try {
    const currentUser = await User.findById(user._id);

    const cartIsEmpty = !currentUser.cart;
    if (cartIsEmpty) {
      res.status(400);
      throw new Error("Cart Is Empty");
    }
    currentUser.cart.items = currentUser.cart.items.filter(
      (item) => item.recipe.toString() !== recipeId
    );

    await currentUser.save();

    //check if there is no items in the cart reset the cart
    if (currentUser.cart.items.length === 0) {
      const updatedUser = await User.updateOne(
        { _id: user._id },
        { $unset: { cart: "" } }
      );
      return res.status(200).json([]);
    }

    //return all the info needed for a smooth context workflow in frontend-aka items of the cart for this route

    const updatedCart = await User.findById(user._id)
      .select("cart")
      .populate("cart.items.recipe");

    res.status(200).json(updatedCart.cart.items);
  } catch (error) {
    console.log(error);
    res.status(500);
    throw new Error("Server Error");
  }
});

module.exports = {
  registerUser,
  loginUser,
  makeUserAChef,
  logoutUser,
  retrieveUser,
  updateUserData,
  getUserById,
  getUserCart,
  editUserCart,
  deleteUserCart,
  deleteAnItemFromCart,
};
