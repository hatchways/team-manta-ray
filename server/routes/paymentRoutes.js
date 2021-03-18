const express = require("express");
const { paymentRequest } = require("../controllers/paymentController");
const router = express.Router();

router.route("/").post(paymentRequest);

module.exports = router;
