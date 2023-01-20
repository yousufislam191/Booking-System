const express = require("express");
const router = express.Router();

const { createAdmin } = require("../controllers/adminAuth.controllers");

router.post("/", createAdmin);

module.exports = router;
