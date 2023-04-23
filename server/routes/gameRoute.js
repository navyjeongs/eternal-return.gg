import express from "express";
import { getSelectArea } from "../controllers/getSelectAreaController.js";
import { routeDetail } from "../controllers/routeDetailController.js";

const router = express.Router();

router.get("/api/route-path/:route-id", getSelectArea);
router.get("/api/route/:route-id", routeDetail);

export default router;
