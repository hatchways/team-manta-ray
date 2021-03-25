const express = require("express");
const router = express.Router();
const {
  uploadImage,
  upload,
  getImageSrc,
} = require("../controllers/ImageControllers");
const { auth } = require("../middlewares/authMiddlewares");

router.route("/").post(auth, upload, uploadImage);

module.exports = router;
