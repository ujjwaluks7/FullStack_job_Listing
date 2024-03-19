import express from "express";
const router = express.Router();
import authMiddleware from "../middleware/authMiddleware.js";
import {
  allPosts,
  login,
  userInfo,
} from "../controllers/comman.controllers.js";

router.post("/login", login);
router.get("/info", authMiddleware, userInfo);
router.get("/dalywork", allPosts);

export default router;
