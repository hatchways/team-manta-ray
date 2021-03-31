const express = require("express");
const router = express.Router();

const {
  addOrderItems,
  getCurrentUserOrders,
} = require("../controllers/orderController");
const { auth } = require("../middlewares/authMiddlewares");

router.route("/").post(auth, addOrderItems).get(auth, getCurrentUserOrders);

module.exports = router;
