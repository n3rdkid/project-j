import { body } from "express-validator";

const UserValidations = {
  signIn: [
    body("email").isEmail().withMessage("Email must be valid."),
    body("password").trim().notEmpty().withMessage("Password is required."),
  ],
  signUp: [
    body("email").isEmail().withMessage("Email must be provided!"),
    body("password")
      .trim()
      .isLength({ min: 6 })
      .withMessage("Password must be atleast 6 characters!"),
  ],
};

export default UserValidations;
