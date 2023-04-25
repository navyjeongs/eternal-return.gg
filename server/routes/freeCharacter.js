import express from "express";
import { freeCharacter } from "../controllers/freeCharacterController.js";

const router = express.Router();

router.get("/api/freecharacter", freeCharacter);

export default router;
