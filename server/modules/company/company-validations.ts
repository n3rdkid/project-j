import { body } from "express-validator";

const CompanyValidations = {
  signIn: [
    body("email").isEmail().withMessage("Email must be valid."),
    body("password").trim().notEmpty().withMessage("Password is required."),
  ],
  registerCompany: [
    body("email").isEmail().withMessage("Email must be provided!"),
    body("password")
      .trim()
      .isLength({ min: 6 })
      .withMessage("Password must be atleast 6 characters!"),
  ],
  forgotPassword: [
    body("email").isEmail().withMessage("Email must be provided!"),
  ],
  resetPassword: [
    body("password")
      .trim()
      .isLength({ min: 6 })
      .withMessage("Password must be atleast 6 characters!"),
    body("confirmPassword")
      .trim()
      .custom(async (confirmPassword, { req }) => {
        const { password } = req.body;
        if (confirmPassword !== password.trim()) {
          throw new Error("Password and confirm password must be same!");
        }
      }),
  ],
};

export default CompanyValidations;
