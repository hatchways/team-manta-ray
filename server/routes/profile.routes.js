const express = require("express");
const router = express.Router();

// MIDDLEWARES
const { auth } = require("../middlewares/auth.middlewares");
const { getProfile } = require("../middlewares/profile.middleware");

// CONTROLLERS
const {
  createProfile,
  retrieveProfile,
  updateProfile,
  deleteProfile,
} = require("../controllers/profile.controllers");

router.route("/").post(auth, createProfile); // create profile

router.route("/:id").get(auth, getProfile, retrieveProfile); // get profile by user._id

router.route("/:id").put(auth, getProfile, updateProfile); // update profile by user._id

router.route("/:id").delete(auth, getProfile, deleteProfile); // delete profile by user._id

module.exports = router;
