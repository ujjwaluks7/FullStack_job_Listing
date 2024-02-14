import express from "express";
const router = express.Router();
import authMiddleware from "../middleware/authMiddleware.js";
import { login, userInfo } from "../controllers/comman.controllers.js";

router.post("/login", login);
router.get("/info", authMiddleware, userInfo);

export default router;
