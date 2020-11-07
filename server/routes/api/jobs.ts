import express from "express";
import validateRequest from "../../middleware/validate-request";
import JobController from "../../modules/jobs/job-controller";
import JobValidations from "../../modules/jobs/job-validations";
const router = express.Router();

router.get("/job/:id", JobController.retrieveJobsById);
router.get("/:page?", JobController.retrieveAllJobs);
router.post(
  "/",
  JobValidations.requiredFields,
  validateRequest,
  JobController.addJob
);
router.put(
  "/:id",
  JobValidations.requiredFields,
  validateRequest,
  JobController.editJob
);
router.delete("/:id", JobController.deleteJob);

export { router as jobRouter };
