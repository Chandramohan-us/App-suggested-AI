import express from "express";
import { getAIRecommendation } from "../controllers/aiController.js";

const router = express.Router();

// Route: POST /api/search
router.post("/search", getAIRecommendation);

export default router;
