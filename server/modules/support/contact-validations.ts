import { body } from "express-validator";

const ContactValidations = {
  requiredFields: [
    body("email").isEmail().withMessage("Email must be valid!"),
    body("name").trim().notEmpty().withMessage("Name is required!"),
    body("message").trim().notEmpty().withMessage("Message is required!"),
  ],
};

export default ContactValidations;
