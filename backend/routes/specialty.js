const express = require("express");
const router = express.Router();
const SpecialtyController = require("../controllers/SpecaltyController");

router.get("/", SpecialtyController.index);
router.get("/:id", SpecialtyController.show);
router.post("/", SpecialtyController.store);
router.put("/:id", SpecialtyController.update);
router.delete("/:id", SpecialtyController.destroy);

module.exports = router;
