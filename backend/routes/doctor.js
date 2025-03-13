const express = require("express");
const router = express.Router();
const DoctorController = require("../controllers/DoctorController");

router.get("/", DoctorController.index);
router.get("/:id", DoctorController.show);
router.get("/get_by_user_id/:id", DoctorController.showByUserID);
router.post("/", DoctorController.store);
router.put("/:id", DoctorController.update);
router.put("/admin/:id", DoctorController.adminUpdate);
router.delete("/:id", DoctorController.destroy);

module.exports = router;
