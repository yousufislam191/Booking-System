const express = require("express");
const router = express.Router();

const { getUserBookedMetting } = require("../controllers/metting.controllers");

router.patch("/:id", getUserBookedMetting);

module.exports = router;
