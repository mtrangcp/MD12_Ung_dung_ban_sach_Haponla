const express = require("express");
const router = express.Router();
const controller = require("../controllers/api/bill.controller");

router.get("/", controller.getAll);
router.post("/add", controller.add);
router.get("/:id", controller.get);
router.delete("/del/:id", controller.remove);
router.patch("/:id", controller.set);

module.exports = router;
