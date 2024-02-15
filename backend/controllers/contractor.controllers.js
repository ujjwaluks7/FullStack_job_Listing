import Contractor from "../models/contractor.model.js";
import bcrypt from "bcryptjs";
import Jwt from "jsonwebtoken";

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

export { contractorRegister };
