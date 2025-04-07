const express = require("express");
const router = express.Router();
const isAdmin = require("../middleware/auth/isAdmin");
const UserValidationRules = require("../middleware/validations/user");
const isAuth = require("../middleware/auth/isAuth");
const {
  validateEmail,
  returnValidation,
} = require("../middleware/validations");
const upload = require("../config/multerConfig");
const AppointmentController = require("../controllers/AppointmentController");

router.get("/", AppointmentController.index);
router.get("/focus", isAuth, AppointmentController.focus);
router.get("/:id", AppointmentController.show);
router.get("/get_one/:id", AppointmentController.getOne);
router.post("/", AppointmentController.store);
router.put("/:id", AppointmentController.update);
router.delete("/:id", AppointmentController.destroy);

module.exports = router;
