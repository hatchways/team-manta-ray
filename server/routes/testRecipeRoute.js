const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
  console.log("reaching end Point");
  res.json(req.body);
});

module.exports = router;
