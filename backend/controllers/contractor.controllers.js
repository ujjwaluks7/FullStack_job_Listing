import Contractor from "../models/contractor.model.js";
import Post from "../models/post.model.js";
import bcrypt from "bcryptjs";
import path from "path";
import {
  deleteOnCloudinary,
  uploadOnCloudinary,
} from "../config/cloudinary.js";

// fetch contractor porfile

export const contractorProfile = async (req, res) => {
  const contractorId = req.user?._id;

  try {
    const contractorData = await Contractor.findById(contractorId).select(
      "-password"
    );

    return res
      .status(200)
      .json({ success: true, message: "", data: contractorData });
  } catch (error) {
    return res.status(404).json({ success: false, message: error.message });
  }
};

// register
export const contractorRegister = async (req, res) => {
  const {
    name,
    email,
    gender,
    age,
    phone,
    address,
    companyAddress,
    companyName,
    password,
  } = req.body;

  if (
    !name ||
    !email ||
    !gender ||
    !age ||
    !phone ||
    !password ||
    !address ||
    !companyName ||
    !companyAddress ||
    !password
  ) {
    return res
      .status(404)
      .json({ success: false, message: "All fields are required" });
  }
  if (!email.includes("@") || !email.includes(".")) {
    return res
      .status(404)
      .json({ success: false, message: "Please enter valid email" });
  }
  if (!phone.toString().length === 10) {
    return res
      .status(404)
      .json({ success: false, message: "Please enter mobile number" });
  }

  try {
    const existingContractor = await Contractor.findOne({ email });
    if (existingContractor) {
      return res
        .status(404)
        .json({ success: false, message: "contractor already exist" });
    }

    const newContractor = new Contractor({
      name,
      email,
      gender,
      age,
      phone,
      address,
      companyAddress,
      companyName,
      password,
    });
    await newContractor.save();
    res
      .status(200)
      .json({ success: true, message: "Contractor successfully register" });
  } catch (error) {
    console.log(error);
    res.status(404).json({ success: false, message: error.message });
  }
};

// change profilepic

export const contractorChangeProfilePic = async (req, res) => {
  const file = req.file?.originalname;
  const contractorId = req.user?._id;

  if (!file) {
    return res
      .status(404)
      .json({ success: false, message: "please provide image" });
  }

  const extension = path.extname(file);
  // check image extension
  if (
    extension !== ".png" &&
    extension !== ".jpg" &&
    extension !== ".jpeg" &&
    extension !== ".webp"
  ) {
    return res.status(404).json({
      success: false,
      message: "only .png , .jpeg , jpg and webp formate allowed",
    });
  }
  // chaeck image size
  if (req.file.size > 512000) {
    return res.status(404).json({
      success: false,
      message: "please provide image size less then 500kb",
    });
  }

  try {
    // upload image on cloudinary
    const result = await uploadOnCloudinary(req.file.path);
    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Image not uploaded please try again",
      });
    }

    // update profile pic
    const previousImage = req.user?.profilePic;

    const update = await Contractor.findByIdAndUpdate(
      contractorId,
      {
        $set: {
          profilePic: result?.secure_url,
        },
      },
      { new: true }
    );

    // find previous image to cloudinaryId
    if (previousImage) {
      const imageIdArr = previousImage.split("/");
      const imageId = imageIdArr[imageIdArr?.length - 1];
      const cloudinaryId = imageId.split(".")[0];

      // delete previous image function call
      const deleteResponse = await deleteOnCloudinary(cloudinaryId);
      console.log("deleteResponse", deleteResponse);
      return res.status(200).json({
        success: true,
        message: "image upload successfully",
        data: result?.secure_url,
      });
    }
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
};

// create job post

export const createJobPost = async (req, res) => {
  const {
    jobName,
    jobDescription,
    requiredSkill,
    jobType,
    state,
    district,
    city,
    pincode,
    address,
  } = req.body;

  const user = req.user;

  if (
    !jobName ||
    !jobDescription ||
    !requiredSkill ||
    !jobType ||
    !state ||
    !district ||
    !city ||
    !pincode ||
    !address
  ) {
    return res.status(404).json({
      success: false,
      message: "All fields are require",
    });
  }

  try {
    const newPost = await Post({
      jobName,
      jobDescription,
      requiredSkill,
      jobType,
      author: user._id,
      state,
      district,
      city,
      pincode,
      address,
    });

    await newPost.save();

    const updatedUser = await Contractor.findOneAndUpdate(
      { _id: user._id },
      { $push: { posts: newPost._id } },
      { new: true }
    );

    if (!updatedUser) {
      throw new Error("User not found");
    }

    return res.status(200).json({
      success: true,
      message: "Post created successfully",
    });
  } catch (error) {
    // console.log(error.message);
    return res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

// show all posts

export const showAllPosts = async (req, res) => {
  const contractorId = req.user?._id;

  try {
    const allPosts = await Post.find({ author: contractorId });

    return res.status(200).json({
      success: true,
      message: "",
      data: { totalPosts: allPosts.length, data: allPosts },
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

// delete particular post

export const deleteSinglePost = async (req, res) => {
  const user = req.user;
  const postId = req.params.id;

  try {
    // find post
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(400).json({
        success: false,
        message: "Post not found",
      });
    }

    const updatedUser = await Contractor.findByIdAndUpdate(
      user._id,
      { $pull: { posts: postId } }, // $pull removes all instances of the value specified
      { new: true }
    );

    const deletePost = await Post.findByIdAndDelete(postId);

    return res.status(200).json({
      success: true,
      message: "Post deleted successfully",
    });
  } catch (error) {
    console.log(error.message);
    return res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

// view single post

export const viewSinglePost = async (req, res) => {
  const contractorId = req.user?._id;
  const postId = req.params.id;

  try {
    const post = await Post.findById(postId);

    return res.status(200).json({
      success: true,
      message: "Post deleted successfully",
      data: post,
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

// edit single post
export const editSinglePost = async (req, res) => {
  const contractorId = req.user?._id;
  const postId = req.params.id;
  const {
    jobName,
    jobDescription,
    requiredSkill,
    jobType,
    state,
    district,
    city,
    pincode,
    address,
  } = req.body;

  try {
    const post = await Post.findByIdAndUpdate(postId, {
      $set: {
        jobName,
        jobDescription,
        requiredSkill,
        jobType,
        state,
        district,
        city,
        pincode,
        address,
      },
    });

    return res.status(200).json({
      success: true,
      message: "Post updated successfully",
      data: post,
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

// update labour
export const updateContractorProfile = async (req, res) => {
  // console.log(req.body);
  const userId = req.user?._id;

  const {
    name,
    email,
    gender,
    age,
    phone,
    password,
    address,
    companyName,
    companyAddress,
  } = req.body;

  const hashPass = password ? await bcrypt.hash(password, 13) : req.user?._id;

  try {
    const updatedUser = await Contractor.findByIdAndUpdate(
      userId,
      {
        $set: {
          name,
          email,
          phone,
          gender,
          age,
          password: hashPass,
          address,
          companyAddress,
          companyName,
        },
      },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Profile update successfully",
      data: updatedUser,
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};
