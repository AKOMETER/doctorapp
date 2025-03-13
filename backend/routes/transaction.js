const express = require("express");
const router = express.Router();
const TransactionController = require("../controllers/TransactionController");

router.get("/", TransactionController.index);
router.get("/:id", TransactionController.show);
router.get("/get_by_user_id/:id", TransactionController.showByUserID);
router.post("/", TransactionController.store);
router.put("/:id", TransactionController.update);
router.put("/admin/:id", TransactionController.adminUpdate);
router.delete("/:id", TransactionController.destroy);

module.exports = router;
