import express from "express";

import { userRouter } from "./api/users";
import { jobRouter } from "./api/jobs";

const router = express.Router();
// All routes: User
router.use("/users", userRouter);
// All routes : Job
router.use("/jobs", jobRouter);

export { router as routes };
