const express = require("express");
const router = express.Router();

const { getFiltered } = require("../controllers/searchController");

router.route("/").get(getFiltered);

module.exports = router;
