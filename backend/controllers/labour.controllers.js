import Labour from "../models/labour.model.js";
import bcrypt from "bcryptjs";
import path from "path";
import {
  deleteOnCloudinary,
  uploadOnCloudinary,
} from "../config/cloudinary.js";

// register
export const labourRegister = async (req, res) => {
  const { name, email, gender, age, phone, password } = req.body;

  if (!name || !email || !gender || !age || !phone || !password) {
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
    const existingLabour = await Labour.findOne({ email });
    if (existingLabour) {
      return res
        .status(404)
        .json({ success: false, message: "labour already exist" });
    }

    const newLabour = new Labour({
      name,
      email,
      gender,
      age,
      phone,
      password,
    });
    await newLabour.save();
    res
      .status(200)
      .json({ success: true, message: "Labour successfully registr" });
  } catch (error) {
    console.log(error);
    res.status(404).json({ success: false, message: "Internal server error" });
  }
};

// profile

export const labourProfile = async (req, res) => {
  const labour = req.user;

  if (!labour) {
    return res
      .status(404)
      .json({ success: false, message: "Labour not found" });
  }

  res.status(200).json({ success: true, message: "", data: labour });
};

// change profilepic

export const changeProfilePic = async (req, res) => {
  const file = req.file?.originalname;
  const labourId = req.user?._id;
  const previousImage = req.user?.profilePic;

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

    const update = await Labour.findByIdAndUpdate(
      labourId,
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

// update labour
export const updateLabourProfile = async (req, res) => {
  const userId = req.user?._id;
  const { name, email, phone, gender, age, password, address, skill } =
    req.body;

  const hashPass = password ? await bcrypt.hash(password, 13) : req.user?._id;

  try {
    const updatedUser = await Labour.findByIdAndUpdate(
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
          skill,
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
