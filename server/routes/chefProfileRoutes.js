const express = require("express");
const router = express.Router();

// MIDDLEWARES
const { auth } = require("../middlewares/authMiddlewares");
const { getChefProfile } = require("../middlewares/chefProfileMiddlewares");

// CONTROLLERS
const {
  createChefProfile,
  retrieveChefProfile,
  updateChefProfile,
  deleteChefProfile,
} = require("../controllers/chefProfileController");

router.route("/").post(auth, createChefProfile); // create chef profile

router.route("/:userId").get(auth, getChefProfile, retrieveChefProfile); // get current chef profile

router.route("/:userId").put(auth, getChefProfile, updateChefProfile); // update chef profile by user._id

router.route("/:userId").delete(auth, getChefProfile, deleteChefProfile); // delete chef profile by user._id

module.exports = router;
