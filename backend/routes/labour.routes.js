import express from "express";
const router = express.Router();
import { labourRegister } from "../controllers/labour.controllers.js";

router.post("/register", labourRegister);

export default router;
