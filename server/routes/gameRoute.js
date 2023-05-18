import express from "express";
import { getSelectArea } from "../controllers/getSelectAreaController.js";

const router = express.Router();

router.get("/api/routepath/:route", getSelectArea);

export default router;
