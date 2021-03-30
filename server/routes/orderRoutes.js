const express = require("express");
const router = express.Router();

const { addOrderItems } = require("../controllers/orderController");
const { auth } = require("../middlewares/authMiddlewares");

router.route("/").post(auth, addOrderItems);

module.exports = router;
