const express = require("express");
const router = express.Router();

const { createMetting } = require("../controllers/metting.controllers");

router.post("/", createMetting);

module.exports = router;
