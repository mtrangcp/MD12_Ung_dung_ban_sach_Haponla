/**
 * dev: ManhThai
 */
const express = require("express");
const router = express.Router();
const controller = require("./category.controller");

router.get("/", controller.getAll);

module.exports = router;
