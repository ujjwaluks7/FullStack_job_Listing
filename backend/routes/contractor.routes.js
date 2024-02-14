import express from "express";
import { contractorRegister } from "../controllers/contractor.controllers.js";

const router = express.Router();

router.post("/register", contractorRegister);

export default router;
