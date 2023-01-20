const express = require("express");
const router = express.Router();

const { getAdmin } = require("../controllers/adminAuth.controllers");

router.post("/", getAdmin);

module.exports = router;
