import Contractor from "../models/contractor.model.js";
import bcrypt from "bcryptjs";
import Jwt from "jsonwebtoken";
import path from "path";
import {
  deleteOnCloudinary,
  uploadOnCloudinary,
} from "../config/cloudinary.js";
// register
const contractorRegister = async (req, res) => {
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

const contractorChangeProfilePic = async (req, res) => {
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

export { contractorRegister, contractorChangeProfilePic };
