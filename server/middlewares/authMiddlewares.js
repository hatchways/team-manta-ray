const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const User = require("../models/userModel");

require("dotenv").config();

// extract cookie from jwt
const extractCookie = (req) => {
  console.log("extracting jwt cookie");

  let jwt = null;

  if (req && req.cookies) jwt = req.cookies["token"];

  return jwt;
};

// use passport for authenticating users
passport.use(
  "auth",
  new JwtStrategy(
    {
      jwtFromRequest: extractCookie,

      // the secretOrKey must be the same as the secret used in generating token
      secretOrKey: process.env.JWT_SECRET || "secretIsTheKey",
    },
    async (payload, done) => {
      console.log("auth middleware reached");

      try {
        // check the token generator if the signed object is id
        // change the payload props otherwise
        const user = await User.findById(payload.id);

        // check token expiration
        if (Date.now() > payload.expiration) {
          done("Token expired", false);
        }

        // if user is not found
        if (!user) {
          return done("Unauthorized", false);
        }

        // continue
        done(null, user);
      } catch (error) {
        console.log(error);

        done(error, false);
      }
    }
  )
);

module.exports = {
  auth: passport.authenticate("auth", { session: false }),
};
