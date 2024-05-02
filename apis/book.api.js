/**
 * dev: ManhThai
 */
const express = require("express");
const router = express.Router();
const controller = require("./book.controller");

router.get("/top10", controller.getTopBanChay);

router.get("/", controller.getAll);
router.get('/:id', controller.get);

module.exports = router;
