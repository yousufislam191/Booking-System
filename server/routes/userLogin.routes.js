const express = require("express");
const router = express.Router();

const { getUserData, getUser } = require("../controllers/userAuth.controllers");

router.get("/", getUserData);
router.post("/", getUser);

module.exports = router;
