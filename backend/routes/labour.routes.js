import express from "express";
const router = express.Router();
import authMiddleware from "../middleware/authMiddleware.js";
import {
  changeProfilePic,
  labourProfile,
  labourRegister,
  updateLabourProfile,
} from "../controllers/labour.controllers.js";
import labourAuthMiddleware from "../middleware/labourAuthMiddleware.js";
import uploader from "../middleware/multerMiddleware.js";

router.post("/register", labourRegister);
router.post("/profile", labourAuthMiddleware, labourProfile);
router.post(
  "/changeprofilepic",
  uploader.single("profilePic"),
  labourAuthMiddleware,
  changeProfilePic
);

router.put("/updateprofile", labourAuthMiddleware, updateLabourProfile);

export default router;
