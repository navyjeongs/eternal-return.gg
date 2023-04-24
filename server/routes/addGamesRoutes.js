import express from "express";
import { addGames } from "../controllers/addGamesController.js";

const router = express.Router();

router.get("/api/games", addGames);
// router.get("/games/:userNum/:nextId", getNextGames);

export default router;
