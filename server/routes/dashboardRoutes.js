import express from "express";
import { getDashboardStats } from "../controllers/dashboardController.js";
import { protect } from "../middleware/authMiddleware.js"; // অথেন্টিকেশন চেক করার জন্য

// routes/dashboardRoutes.js
const router = express.Router();
router.get("/", protect, getDashboardStats); 
export default router;