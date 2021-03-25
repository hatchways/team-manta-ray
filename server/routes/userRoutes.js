const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  logoutUser,
  makeUserAChef,
  updateUser,
  retrieveUser,
} = require("../controllers/userController");
const { auth } = require("../middlewares/authMiddlewares");

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logoutUser);
router.route("/markChef").put(auth, makeUserAChef);
router.route("/").get(auth, retrieveUser);
router.route("/").put(auth, updateUser);

module.exports = router;
