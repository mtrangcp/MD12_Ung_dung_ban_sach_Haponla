/**
 * dev: ManhThai
 */
const express = require("express");
const router = express.Router();
const controller = require("./book.controller");

router.get("/", controller.getAll);

module.exports = router;
