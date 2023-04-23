import express from "express";
import { getGames } from "../controllers/gamesController.js";

const router = express.Router();

router.get("/api/games", getGames);
// router.get("/games/:userNum/:nextId", getNextGames);

export default router;
