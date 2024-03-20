import Contractor from "../models/contractor.model.js";
import Labour from "../models/labour.model.js";
import bcrypt from "bcryptjs";
import Jwt from "jsonwebtoken";
import Post from "../models/post.model.js";
import mongoose from "mongoose";

// login
export const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(404)
      .json({ success: false, message: "All fields are required" });
  }
  //localhost:7980/api/v1/contractor/login
  // email validation
  http: if (!email.includes("@") || !email.includes(".")) {
    return res
      .status(404)
      .json({ success: false, message: "please enter valid email" });
  }

  try {
    let existUser = await Contractor.findOne({ email });
    if (!existUser) {
      existUser = await Labour.findOne({ email });
      if (!existUser) {
        return res
          .status(404)
          .json({ success: false, message: "User not registered" });
      }
    }

    // compare password
    const match = await bcrypt.compare(password, existUser.password);

    if (!match) {
      return res
        .status(404)
        .json({ success: false, message: "Invalid credentials" });
    }

    // generate token
    const token = Jwt.sign(
      { userId: existUser._id, role: existUser.role, userId: existUser._id },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "30d",
      }
    );

    res.status(200).json({
      success: true,
      message: "user successfully login",
      data: { token: token, role: existUser.role, userId: existUser._id },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// info
export const userInfo = async (req, res) => {
  const user = req.user;

  if (!user) {
    return res
      .status(404)
      .json({ success: false, message: "contractor not found " });
  }

  res.status(200).json({ success: true, message: "", data: user });
};

// all posts

export const allPosts = async (req, res) => {
  try {
    const allPosts = await Post.find().populate("author");

    return res.status(200).json({
      success: true,
      message: "",
      data: allPosts,
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

// post apply

export const postApply = async (req, res) => {
  const userId = req.user?._id;
  const { postId } = req.body;
  const isPostExist = await Post.findById(postId);

  if (!isPostExist) {
    return res.status(404).json({
      success: false,
      message: "Post not found",
    });
  }

  const session = await mongoose.startSession();
  await session.startTransaction();
  try {
    const postApplyed = await Post.findByIdAndUpdate(postId, {
      $addToSet: { totalApplied: userId },
    });

    const labour = await Labour.findByIdAndUpdate(userId, {
      $addToSet: { applayed: postId },
    });

    const allPosts = await Post.find().populate("author");

    await session.commitTransaction();
    session.endSession();

    return res.status(200).json({
      success: true,
      message: "You are applyed this post",
      data: allPosts,
    });
  } catch (err) {
    console.log("error", err);
    await session.abortTransaction();
    session.endSession();
    return res.status(404).json({
      success: false,
      message: err.message,
    });
  }
};

// search

export const searchPost = async (req, res) => {
  console.log(req.query.q);
};
