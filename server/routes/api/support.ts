import express from "express";
import validateRequest from "../../middleware/validate-request";
import ContactController from "../../modules/support/contact-controller";
import ContactValidation from "../../modules/support/contact-validations";
const router = express.Router();

router.get("/", ContactController.getAllMessage);
router.post(
  "/",
  ContactValidation.requiredFields,
  validateRequest,
  ContactController.newContactMessage
);

export { router as supportRouter };
