const express = require("express");
const router = express.Router();
const PaymentMethodController = require("../controllers/PaymentMethodController");

router.get("/", PaymentMethodController.index);
router.get("/:id", PaymentMethodController.show);
router.get("/get_by_user_id/:id", PaymentMethodController.showByUserID);
router.post("/", PaymentMethodController.store);
router.put("/:id", PaymentMethodController.update);
router.put("/admin/:id", PaymentMethodController.adminUpdate);
router.delete("/:id", PaymentMethodController.destroy);

module.exports = router;
