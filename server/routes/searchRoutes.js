const express = require("express");
const router = express.Router();

const { getFiltered } = require("../controllers/searchController");

router.route("/filter").get(getFiltered);

module.exports = router;
