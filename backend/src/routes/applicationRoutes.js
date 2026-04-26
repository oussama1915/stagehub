import express from "express";
import {
  applyToOffer,
  getMyApplications,
  getAllApplications,
  updateApplicationStatus,
} from "../controllers/applicationController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import roleMiddleware from "../middlewares/roleMiddleware.js";

const router = express.Router();

// User
router.post("/", authMiddleware, applyToOffer);
router.get("/me", authMiddleware, getMyApplications);

// Admin
router.get("/", authMiddleware, roleMiddleware("ADMIN"), getAllApplications);
router.put(
  "/:id/status",
  authMiddleware,
  roleMiddleware("ADMIN"),
  updateApplicationStatus
);

export default router;