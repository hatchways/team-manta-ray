const express = require("express");
const router = express.Router();
const {
  uploadImage,
  upload,
  getImageSrc,
} = require("../controllers/ImageControllers");

// const { auth } = require("../middlewares/authMiddlewares");

//Add auth to both routes-to be the first arguments-
router.route("/").post(upload, uploadImage);
router.route("/:key").get(getImageSrc);

module.exports = router;
