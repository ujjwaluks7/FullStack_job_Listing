import express from "express";
import {
  contractorChangeProfilePic,
  contractorRegister,
  createJobPost,
  deleteSinglePost,
  editSinglePost,
  showAllPosts,
  viewSinglePost,
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
router.get("/allposts", contractorAuthMiddleware, showAllPosts);
router.delete("/delete/:id", contractorAuthMiddleware, deleteSinglePost);
router.get("/view/:id", contractorAuthMiddleware, viewSinglePost);
router.put("/edit/:id", contractorAuthMiddleware, editSinglePost);

export default router;
