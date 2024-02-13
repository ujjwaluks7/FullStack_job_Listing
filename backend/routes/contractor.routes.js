import express from "express";
import {
  contractorLogin,
  contractorRegister,
} from "../controllers/contractor.controllers.js";

const router = express.Router();

router.post("/register", contractorRegister);
router.post("/login", contractorLogin);

export default router;
