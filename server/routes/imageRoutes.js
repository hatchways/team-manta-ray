const express = require("express");
const router = express.Router();
const {
  uploadImage,
  upload,
  getImageSrc,
} = require("../controllers/ImageControllers");

const { auth } = require("../middlewares/authMiddlewares");

//Add auth to both routes-to be the first arguments-
router.route("/").post(auth, upload, uploadImage);
router.route("/:key").get(auth, getImageSrc);

module.exports = router;
