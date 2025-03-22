const express = require("express");
const router = express.Router();
const { checkoutOrder } = require("../controllers/OrderController");
const isAuth = require("../middleware/auth/isAuth");

router.post("/checkout", isAuth, checkoutOrder);

module.exports = router;
