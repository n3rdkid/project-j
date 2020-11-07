import { body } from "express-validator";

const JobValidations = {
  requiredFields: [
    body("jobType").trim().notEmpty().withMessage("Job Type is required."),
    body("jobTitle").trim().notEmpty().withMessage("Job Title is required."),
    body("company").trim().notEmpty().withMessage("Company Name is required."),
    body("location").trim().notEmpty().withMessage("Job Location is required."),
    body("jobLevel").trim().notEmpty().withMessage("Job Level is required."),
    body("expiryDate").trim().notEmpty().withMessage("Expiry Date is required."),
  ],
};

export default JobValidations;
