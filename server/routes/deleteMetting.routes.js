const express = require("express");
const router = express.Router();

const { deleteMetting } = require("../controllers/metting.controllers");

router.delete("/:id", deleteMetting);

module.exports = router;
