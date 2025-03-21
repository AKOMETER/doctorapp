const express = require("express");
const router = express.Router();
const cartController = require("../controllers/CartController");

// Routes
router.post("/", cartController.addToCart);
router.get("/:userId", cartController.getUserCart);
router.put("/:id", cartController.updateCartItem);
router.delete("/:id", cartController.removeCartItem);

module.exports = router;
