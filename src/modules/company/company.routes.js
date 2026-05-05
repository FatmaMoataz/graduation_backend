import { Router } from "express";
import * as companyController from "../company/company.controller.js";

const router = Router();

router.post("/", companyController.createCompany);
router.get("/", companyController.getAllCompanies);
router.get("/:id", companyController.getCompanyById);
router.put("/:id", companyController.updateCompany);
router.delete("/:id", companyController.deleteCompany);

export default router;