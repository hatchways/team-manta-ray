require("dotenv").config();
const createError = require("http-errors");
const express = require("express");
const { join } = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const cors = require("cors");

const connectDB = require("./config/db");
const cors = require("cors");

const indexRouter = require("./routes/index");

const userRoutes = require("./routes/userRoutes");
const imageRoutes = require("./routes/imageRoutes");
const recipeRoutes = require("./routes/recipeRoutes");
const userProfileRoutes = require("./routes/userProfileRoutes");
const chefProfileRoutes = require("./routes/chefProfileRoutes");

connectDB();

const { json, urlencoded } = express;

var app = express();

app.use(cors());
app.use(logger("dev"));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(join(__dirname, "public")));
app.use(cors());

app.use("/", indexRouter);

// Routes for users
app.use("/api/users", userRoutes);
//Routes for images
app.use("/api/image", imageRoutes);
// Routes for userProfiles
app.use("/api/userProfiles", userProfileRoutes);
// // Routes for chefProfiles
app.use("/api/chefProfiles", chefProfileRoutes);
// Routes for recipes
app.use("/api/recipes", recipeRoutes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  // render the error page
  res.status(statusCode);
  res.json({
    error: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
});

module.exports = app;
