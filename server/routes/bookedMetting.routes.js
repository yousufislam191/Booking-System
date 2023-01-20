const express = require("express");
const router = express.Router();

const { bookedMetting } = require("../controllers/metting.controllers");

router.patch("/:id", bookedMetting);

module.exports = router;
