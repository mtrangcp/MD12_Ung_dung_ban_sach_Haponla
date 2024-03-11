/**
 * dev: ManhThai
 */
const express = require("express");
const router = express.Router();
const controller = require("../controllers/api/billItemApi.controller");

router
  .get("/", controller.getAll)
  .post("/", controller.add)
  .get("/:id", controller.get)
  .delete("/:id", controller.remove)
  .patch("/:id", controller.set);

module.exports = router