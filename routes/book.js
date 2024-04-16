/**
 * dev: ManhThai
 */
const express = require("express");
const router = express.Router();
const controller = require("../controllers/control/book.controller");

router
  .get("/", controller.getAll)
  .post("/", controller.add)
  .post("/:id", controller.set)
  .get("/:id",controller.remove);

module.exports = router;
