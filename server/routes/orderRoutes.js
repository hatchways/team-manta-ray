const express = require("express");
const router = express.Router();

const { getUserOrder } = require("../controllers/orderController");
const { auth } = require("../middlewares/authMiddlewares");

router.route("/").get(auth, getUserOrder);

module.exports = router;
