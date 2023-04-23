import express from "express";
import { getNotice } from "../controllers/noticeController.js";

const router = express.Router();

router.get("/api/notice", getNotice);

export default router;
