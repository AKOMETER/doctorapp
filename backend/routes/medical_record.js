const express = require("express");
const router = express.Router();
const RecordController = require("../controllers/MedicalRecord");

router.post("/", RecordController.createRecord);
router.get("/", RecordController.getAllRecords);
router.get("/:id", RecordController.getRecordByUserId);
router.put("/:id", RecordController.updateRecord);
router.delete("/:id", RecordController.deleteRecord);

module.exports = router;
