import express from "express";
import {
  contractorChangeProfilePic,
  contractorRegister,
  createJobPost,
  showAllPosts,
} from "../controllers/contractor.controllers.js";
import contractorAuthMiddleware from "../middleware/contractorAuthMiddleware.js";
import uploader from "../middleware/multerMiddleware.js";
const router = express.Router();

router.post("/register", contractorRegister);
router.post(
  "/changeprofilepic",
  uploader.single("profilePic"),
  contractorAuthMiddleware,
  contractorChangeProfilePic
);

router.post("/createpost", contractorAuthMiddleware, createJobPost);
router.post("/allposts", contractorAuthMiddleware, showAllPosts);

export default router;
