const express = require("express");
const router = express.Router();
const users = require("../data/users");

/**
 * @description Get all users
 * @route GET /api/users
 * @access Public
 */
router.get("/", (req, res) => {
	res.send(users);
});

/**
 * @description Register a new user
 * @route POST /api/users
 * @access Public
 */
router.post("/register", (req, res) => {
	const newUser = {
		name: req.body.name,
		email: req.body.email,
		password: req.body.password,
	};

	if (newUser.password.length <= 6) {
		res.status(400).json({ message: "Password must be at least 7 characters" });
		return;
	}
	users.push(newUser);
	res.status(201).json(users);
});

module.exports = router;
