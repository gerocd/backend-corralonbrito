import { Router } from "express";
import { getStock } from "../controllers/stock.controller.js";

const router = Router();

router.get('/stock', getStock);

export default router;
