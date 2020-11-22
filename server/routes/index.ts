import express from "express";

import { userRouter } from "./api/users";
import { jobRouter } from "./api/jobs";
import { supportRouter } from "./api/support";

const router = express.Router();
// All routes: User
router.use("/users", userRouter);
// All routes : Job
router.use("/jobs", jobRouter);
// All routes : Support
router.use("/support", supportRouter);

export { router as routes };
