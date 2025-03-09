const express = require("express");
const router = express.Router();
const LabController = require("../controllers/LabController");

router.get("/", LabController.index);
router.get("/:id", LabController.show);
router.post("/", LabController.store);
router.put("/:id", LabController.update);
router.delete("/:id", LabController.destroy);

module.exports = router;
