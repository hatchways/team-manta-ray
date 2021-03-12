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

router.route("/:id").get(auth, getChefProfile, retrieveChefProfile); // get chef profile by user._id

router.route("/:id").put(auth, getChefProfile, updateChefProfile); // update chef profile by user._id

router.route("/:id").delete(auth, getChefProfile, deleteChefProfile); // delete chef profile by user._id

module.exports = router;
