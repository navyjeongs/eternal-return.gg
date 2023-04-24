import express from "express";
import { detailGame } from "../controllers/detailGameController.js";

const router = express.Router();

router.get("/api/detailgame/:gameid", detailGame);

export default router;
