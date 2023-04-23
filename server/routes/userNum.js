import express from "express";
import { getUserNum } from "../controllers/userNumController.js";

const router = express.Router();

router.get("/api/user/number/:name", getUserNum);

export default router;
