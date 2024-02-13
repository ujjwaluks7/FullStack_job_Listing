import express from "express";
const router = express.Router();
import {
  labourRegister,
  labourLogin,
} from "../controllers/labour.controllers.js";

router.post("/register", labourRegister);
router.post("/login", labourLogin);

export default router;
