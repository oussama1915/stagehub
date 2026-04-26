import express from "express";
import {
  createCompany,
  getAllCompanies,
  getCompanyById,
  updateCompany,
  deleteCompany,
} from "../controllers/companyController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import roleMiddleware from "../middlewares/roleMiddleware.js";

const router = express.Router();
 
// Public
router.get("/", getAllCompanies);
router.get("/:id", getCompanyById);

// Admin only
router.post("/", authMiddleware, roleMiddleware("ADMIN"), createCompany);
router.put("/:id", authMiddleware, roleMiddleware("ADMIN"), updateCompany);
router.delete("/:id", authMiddleware, roleMiddleware("ADMIN"), deleteCompany);

export default router;