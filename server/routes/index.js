const express = require("express");
const router = express.Router();

router.get("/welcome", function (req, res, next) {
	res.status(200).send({ welcomeMessage: "Step 1 (completed)" });
});

router.get("/", (req, res) => {
	res.send("API is running");
});

module.exports = router;
