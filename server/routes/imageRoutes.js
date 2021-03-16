const express = require("express");
const router = express.Router();
const {
  uploadImage,
  upload,
  getImageSrc,
} = require("../controllers/ImageControllers");
// const { auth } = require("../middlewares/authMiddlewares");
//@todo  ADD AUTH middleware to both these routes.

router.route("/").post(upload, uploadImage);
router.route("/:key").get(getImageSrc);

module.exports = router;
