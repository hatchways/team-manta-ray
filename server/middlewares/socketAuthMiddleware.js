const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const socketAuth = async (req, res, next) => {
  // Read the token from the cookie
  let token = null;

  if (req && req.headers.cookie)
    token = req.headers.cookie.substr(6).split(";")[0];
  if (!token) console.log("Access denied...No token provided...");
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select(["-password"]).exec();
    req.user = user;
    next();
  } catch (er) {
    next(new Error(er.message));
  }
};

module.exports = { socketAuth };
