const User = require("../models/userModel.js");
const AsyncHandler = require("express-async-handler");

/**
 * @description Register a new user
 * @route POST /api/users/register
 * @access Public
 */

//Work on this when you come back
const registerUser = AsyncHandler(async (req, res) => {
	const { name, email, password, isChef } = req.body;

	if (password.length <= 6) {
		res
			.status(400)
			.send({ message: "Password length must be atleast 7 characters" });
		return;
	}

	const userExist = await User.findOne({ email });

	if (userExist) {
		res.status(400).send({ message: "User already exists" });
	}

	const user = await User.create({
		name,
		email,
		password,
		isChef,
	});

	if (user) {
		res.status(201).json({
			_id: user._id,
			name: user.name,
			email: user.email,
			isChef: user.isChef,
		});
	} else {
		res.status(400).send({ message: "Invalid user data" });
	}
});

/**
 * @description Login and authenticate a user
 * @route POST /api/users/login
 */

const loginUser = AsyncHandler(async (req, res) => {
	const { email, password } = req.body;

	const user = await User.findOne({ email });

	if (user && (await user.matchPassword(password))) {
		res.json({
			_id: user._id,
			name: user.name,
			email: user.email,
			isChef: user.isChef,
		});
	} else {
		res.status(401).send({ message: "Invalid username or password" });
	}
});

module.exports = { registerUser, loginUser };
