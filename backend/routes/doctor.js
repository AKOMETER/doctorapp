const express = require("express");
const router = express.Router();
const DoctorController = require("../controllers/DoctorController");

router.get("/", DoctorController.index);
router.get("/:id", DoctorController.show);
router.post("/", DoctorController.store);
router.put("/:id", DoctorController.update);
router.delete("/:id", DoctorController.destroy);

module.exports = router;
