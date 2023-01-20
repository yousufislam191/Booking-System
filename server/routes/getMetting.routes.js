const express = require("express");
const router = express.Router();

const { getMetting } = require("../controllers/metting.controllers");

router.get("/", getMetting);

module.exports = router;
