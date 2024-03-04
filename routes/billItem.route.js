const express = require("express");
const router = express.Router();
const controller = require("../controllers/control/billItem.controller");

router.get("/", controller.getAll);
router.post("/", controller.add);
router.get("/:id", controller.get);
router.delete("/:id", controller.remove);
router.patch("/:id", controller.set);

module.exports = router;
