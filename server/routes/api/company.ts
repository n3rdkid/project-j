import express, { Request, Response, NextFunction } from "express";
import currentUser from "../../middleware/current-user";
import validateRequest from "../../middleware/validate-request";

// const upload = multer({
//   limits: {
//     fileSize: 1000000,
//   },
//
// });

import CompanyController from "../../modules/company/company-controller";
import CompanyValidations from "../../modules/company/company-validations";
const router = express.Router();

router.get("/profile", currentUser, CompanyController.getProfileInfo);
router.post("/profile/logo", currentUser, CompanyController.updateLogo);
router.put("/profile", currentUser, CompanyController.updateProfileInfo);
router.post(
  "/sign-up",
  CompanyValidations.registerCompany,
  validateRequest,
  CompanyController.registerCompany
);
router.post(
  "/sign-in",
  CompanyValidations.signIn,
  validateRequest,
  CompanyController.signIn
);

export { router as companyRouter };
