import express from "express";

import { userRouter } from "./api/users";

const router = express.Router();
// All routes: User
router.use("/users", userRouter);

export { router as routes };
