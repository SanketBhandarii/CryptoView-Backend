import express from "express";
import { cryptoGetter } from "../controllers/cryptoController.js";

const router = express.Router();
router.get("/cryptos", cryptoGetter);

export default router;
