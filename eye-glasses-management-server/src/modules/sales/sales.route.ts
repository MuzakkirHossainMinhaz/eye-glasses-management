import express from "express";
import auth from "../../middlewares/auth";
import { SalesController } from "./sales.controller";
const router = express.Router();

router.post("/create-sale", auth(), SalesController.createSale);
router.get("/", auth(), SalesController.getAllSales);

export const SalesRoutes = router;
