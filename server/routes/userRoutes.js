const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  logoutUser,
  makeUserAChef,
  updateUser,
  retrieveUser,
  getUserById,
  getUserCart,
  editUserCart,
  deleteUserCart,
  deleteAnItemFromCart,
} = require("../controllers/userController");
const { auth } = require("../middlewares/authMiddlewares");

router
  .route("/cart")
  .get(auth, getUserCart)
  .put(auth, editUserCart)
  .delete(auth, deleteUserCart);
router.route("/cart/:recipeId").delete(auth, deleteAnItemFromCart);

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logoutUser);
router.route("/markChef").put(auth, makeUserAChef);
router.route("/").get(auth, retrieveUser); // get authenticated user
router.route("/:userId").get(auth, getUserById).put(auth, updateUser); //get user by id param

module.exports = router;
