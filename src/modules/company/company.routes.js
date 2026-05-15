import { Router } from "express";
import * as companyController from "../company/company.controller.js";
import { authenticate } from "../../middlewares/auth.middleware.js";
import { validate } from "../../middlewares/validation.middleware.js";
import {
  createCompanySchema,
  updateCompanySchema,
  idParamSchema
} from "../../validators/company.validation.js";

const router = Router();

router.post(
  "/",
  authenticate,
  validate(createCompanySchema),
  companyController.createCompany
);

router.get("/", companyController.getAllCompanies);

router.get(
  "/:id",
  validate(idParamSchema, "params"),
  companyController.getCompanyById
);

router.put(
  "/:id",
  authenticate,
  validate(idParamSchema, "params"),
  validate(updateCompanySchema),
  companyController.updateCompany
);

router.delete(
  "/:id",
  authenticate,
  validate(idParamSchema, "params"),
  companyController.deleteCompany
);

export default router;