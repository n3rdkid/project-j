import express from "express";
import UserController from "../../modules/user/user-controller";
import UserValidations from "../../modules/user/user-validations";
import currentUser from "../../middleware/current-user";
import validateRequest from "../../middleware/validate-request";
const router = express.Router();

router.post(
  "/signin",
  UserValidations.signIn,
  validateRequest,
  UserController.signIn
);
router.post(
  "/signup",
  UserValidations.signUp,
  validateRequest,
  UserController.signUp
);
router.post("/signout", UserController.signOut);
router.post(
  "/forgot",
  UserValidations.forgotPassword,
  validateRequest,
  UserController.forgotPassword
);
router.post(
  "/reset",
  UserValidations.resetPassword,
  validateRequest,
  UserController.resetPassword
);
router.get("/current-user", currentUser, UserController.currentUser);

export { router as userRouter };
