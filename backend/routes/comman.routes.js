import express from "express";
const router = express.Router();
import authMiddleware from "../middleware/authMiddleware.js";
import labourAuthMiddleware from "../middleware/labourAuthMiddleware.js";

import {
  allPosts,
  login,
  postApply,
  searchPost,
  userInfo,
} from "../controllers/comman.controllers.js";

router.post("/login", login);
router.get("/info", authMiddleware, userInfo);
router.get("/dalywork", allPosts);
router.post("/postapply", labourAuthMiddleware, postApply);
// router.get("/search", searchPost);

export default router;
