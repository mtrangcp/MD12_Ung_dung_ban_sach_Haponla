/**
 * dev: ManhThai
 */
const express = require("express");
const router = express.Router();
const controller = require("./cart.controller");

router
  .get("/", controller.getAll)
  .post("/", controller.add)
  .delete("/:id", controller.remove)
  .patch("/:id", controller.update);

module.exports = router;
