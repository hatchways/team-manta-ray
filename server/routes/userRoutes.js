const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  logoutUser,
  makeUserAChef,
} = require("../controllers/userController");
const { auth } = require("../middlewares/authMiddlewares");

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logoutUser);
router.route("/isChef").put(auth, makeUserAChef);

module.exports = router;
