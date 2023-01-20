const express = require("express");
const router = express.Router();

const { getAdminData } = require("../controllers/adminAuth.controllers");

router.get("/", getAdminData);

module.exports = router;
