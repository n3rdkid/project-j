import express from "express";
import UserController from "../../modules/user/user-controller";

const router = express.Router();

router.post("/signin", UserController.signIn);
router.post("/signup", UserController.signUp);
router.post("/signout", UserController.signOut);
router.get("/currentuser", UserController.currentUser);

export { router as userRouter };
