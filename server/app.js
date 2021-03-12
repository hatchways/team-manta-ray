require("dotenv").config();
const createError = require("http-errors");
const express = require("express");
const { join } = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const multer = require("multer");
const AWS = require("aws-sdk");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");
const connectDB = require("./config/db");

const indexRouter = require("./routes/index");

const userRoutes = require("./routes/userRoutes");

connectDB();

const { json, urlencoded } = express;

var app = express();

app.use(cors());
app.use(logger("dev"));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(join(__dirname, "public")));

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ID,
  secretAccessKey: process.env.AWS_SECRET,
});
const storage = multer.memoryStorage({
  destination: function (req, file, cb) {
    cb(null, "");
  },
});

const upload = multer({ storage }).single("profilePicture");

app.post("/upload", upload, async (req, res) => {
  const fileNameParts = req.file.originalname.split(".");
  const fileType = fileNameParts[fileNameParts.length - 1];

  const key = `${uuidv4()}.${fileType}`;

  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: key,
    Body: req.file.buffer,
  };
  s3.upload(params, (error, data) => {
    if (error) throw new Error(error);
    res.json(data);
  });
});

app.get("/image/:key", (req, res) => {
  const key = req.params.key;

  AWS.config.update({
    accessKeyId: process.env.AWS_ID,
    secretAccessKey: process.env.AWS_SECRET,
  });
  async function getImage() {
    const data = s3
      .getObject({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: `${key}`,
      })
      .promise();
    return data;
  }
  function encode(data) {
    let buf = Buffer.from(data);
    let base64 = buf.toString("base64");
    return base64;
  }
  getImage()
    .then((img) => {
      res.json({ srcData: "data:image/jpeg;base64," + encode(img.Body) });
    })
    .catch((e) => {
      console.log(e);
      res.send(e);
    });
});

app.use("/", indexRouter);

// Routes for users
app.use("/api/users", userRoutes);

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
