const express = require("express");
const router = express.Router();

// MIDDLEWARES
const { auth } = require("../middlewares/authMiddlewares");
const { getUserProfile } = require("../middlewares/userProfileMiddlewares");

// CONTROLLERS
const {
  createUserProfile,
  retrieveUserProfile,
  updateUserProfile,
  deleteUserProfile,
} = require("../controllers/userProfileController");

router.route("/").post(auth, createUserProfile); // create user profile

router.route("/:userId").get(auth, getUserProfile, retrieveUserProfile); // get user profile by user._id

router.route("/:userId").put(auth, getUserProfile, updateUserProfile); // update user profile by user._id

router.route("/:userId").delete(auth, getUserProfile, deleteUserProfile); // delete user profile by user._id

module.exports = router;