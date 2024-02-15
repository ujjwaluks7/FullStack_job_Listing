import express from "express";
const router = express.Router();
import authMiddleware from "../middleware/authMiddleware.js";
import { labourRegister } from "../controllers/labour.controllers.js";

router.post("/register", labourRegister);

export default router;
