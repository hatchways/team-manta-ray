const express = require("express");
const router = express.Router();

const { getCurrentUserOrders } = require("../controllers/orderController");
const { auth } = require("../middlewares/authMiddlewares");

router.route("/").get(auth, getCurrentUserOrders);

module.exports = router;
