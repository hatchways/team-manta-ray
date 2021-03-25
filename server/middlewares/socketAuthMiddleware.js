const jwt = require("jsonwebtoken");
const dotnev = require("dotenv").config();
const User = require("../models/userModel");

const socketAuth = (req, res, next) => {
  // Read the token from the cookie
  let token = null;

  if (req && req.headers.cookie)
    token = req.headers.cookie.substr(6).split(";")[0];
  if (!token) console.log("Access denied...No token provided...");
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);
    req.user = decoded;
    console.log(req.user);
    next();
  } catch (er) {
    next(new Error(er.message));
  }
};

module.exports = { socketAuth };
