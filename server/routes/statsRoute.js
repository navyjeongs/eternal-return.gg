import express from "express";
import { userStats } from "../controllers/userStatsController.js";

const router = express.Router();

router.get("/api/user/stats", userStats);

export default router;
