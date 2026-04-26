import express from "express";
import { getAdminStats } from "../controllers/adminController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import roleMiddleware from "../middlewares/roleMiddleware.js";

const router = express.Router();

router.get(
  "/stats",
  authMiddleware,
  roleMiddleware("ADMIN"),
  getAdminStats
);

export default router;