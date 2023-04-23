import express from "express";
import { detailGame } from "../controllers/detailGameController.js";

const router = express.Router();

router.get("/api/detail-game/:game-id", detailGame);

export default router;
