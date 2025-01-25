const { body } = require("express-validator");

const UserValidationRules = [
  // Validation middleware
  body("firstName")
    .optional()
    .isString()
    .withMessage("First name must be a string."),
  body("lastName")
    .optional()
    .isString()
    .withMessage("Last name must be a string."),
  body("role")
    .optional()
    .isIn(["Doctor", "Patient", "Labs"])
    .withMessage("Role must be one of Doctor, Patient, or Labs."),
  body("mobile")
    .optional()
    .isString()
    .withMessage("Mobile number must be a string."),
  body("email")
    .optional()
    .isEmail()
    .withMessage("Email must be a valid email address."),
  body("profileImage")
    .optional()
    .isString()
    .withMessage("Profile image must be a valid string."),
  body("country")
    .optional()
    .isString()
    .withMessage("Country must be a string."),
  body("state").optional().isString().withMessage("State must be a string."),
  body("city").optional().isString().withMessage("City must be a string."),
  body("address")
    .optional()
    .isString()
    .withMessage("Address must be a string."),
];

module.exports = UserValidationRules;
