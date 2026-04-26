import express from "express";
import {
  createOffer,
  getAllOffers,
  getOfferById,
  updateOffer,
  deleteOffer,
} from "../controllers/offerController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import roleMiddleware from "../middlewares/roleMiddleware.js";

const router = express.Router();

// Public
router.get("/", getAllOffers);
router.get("/:id", getOfferById);

// Admin only
router.post("/", authMiddleware, roleMiddleware("ADMIN"), createOffer);
router.put("/:id", authMiddleware, roleMiddleware("ADMIN"), updateOffer);
router.delete("/:id", authMiddleware, roleMiddleware("ADMIN"), deleteOffer);

export default router;