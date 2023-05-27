import express from "express";
import { getSelectArea } from "../controllers/getSelectAreaController.js";
import { detailRoute } from "../controllers/detailRouteController.js";

const router = express.Router();

router.get("/api/routepath/:route", getSelectArea);
router.get("/api/routepath/detail/:route", detailRoute);

export default router;
