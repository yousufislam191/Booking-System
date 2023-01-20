const express = require("express");
const router = express.Router();

const { getBookedAllMetting } = require("../controllers/metting.controllers");

router.get("/", getBookedAllMetting);

module.exports = router;
