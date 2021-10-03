import express from "express";

import { userRouter } from "./api/users";
import { jobRouter } from "./api/jobs";
import { supportRouter } from "./api/support";
import { companyRouter } from "./api/company";

const router = express.Router();
// All routes: User
router.use("/users", userRouter);
// All routes : Job
router.use("/jobs", jobRouter);
// All routes : Support
router.use("/support", supportRouter);
// All routes : Company
router.use("/company", companyRouter);

export { router as routes };
