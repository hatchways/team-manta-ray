const express = require("express");
const router = express.Router();

// MIDDLEWARES
const { auth } = require("../middlewares/authMiddlewares");
const { getChefProfile } = require("../middlewares/chefProfileMiddlewares");

// CONTROLLERS
const {
  createChefProfile,
  retrieveChefProfile,
  getChefProfileById,
  updateChefProfile,
  deleteChefProfile,
} = require("../controllers/chefProfileController");

router.route("/").post(auth, createChefProfile); // create chef profile

router.route("/:userId").get(auth, getChefProfile, retrieveChefProfile); // get chef profile by userId

router.route("/chefId/:chefProfileId").get(auth, getChefProfileById); // get chef profile by chefProfileId

router.route("/:userId").put(auth, getChefProfile, updateChefProfile); // update chef profile by user._id

router.route("/:userId").delete(auth, getChefProfile, deleteChefProfile); // delete chef profile by user._id

module.exports = router;
