const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  makeUserAChef,
} = require("../controllers/userController");
const { auth } = require("../middlewares/authMiddlewares");

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/isChef").put(auth, makeUserAChef);

module.exports = router;
