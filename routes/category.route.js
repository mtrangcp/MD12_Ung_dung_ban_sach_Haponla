/**
 * dev: ManhThai
 */
const express = require("express");
const router = express.Router();
const controller = require("../controllers/control/category.controller");

router
  .get("/", controller.getAll)
  .post("/", controller.add)
  .post("/:id", controller.set);

module.exports = router;
