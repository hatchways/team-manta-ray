const AWS = require("aws-sdk");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const NodeCache = require("node-cache");
const AsyncHandler = require("express-async-handler");

const imgCache = new NodeCache();

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

const uploadImage = AsyncHandler(async (req, res) => {
  const fileNameParts = req.file.originalname.split(".");
  const fileType = fileNameParts[fileNameParts.length - 1];

  const key = `${uuidv4()}.${fileType}`;

  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: key,
    Body: req.file.buffer,
  };
  s3.upload(params, async (error, data) => {
    if (error) throw new Error(error);
    res.json(data);
  });
});

module.exports = { upload, uploadImage };
