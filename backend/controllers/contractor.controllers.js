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
      .json({ success: false, error: "All fields are required" });
  }
  if (!email.includes("@") || !email.includes(".")) {
    return res
      .status(404)
      .json({ success: false, error: "Please enter valid email" });
  }
  if (!phone.toString().length === 10) {
    return res
      .status(404)
      .json({ success: false, error: "Please enter mobile number" });
  }

  try {
    const existingContractor = await Contractor.findOne({ email });
    if (existingContractor) {
      return res
        .status(404)
        .json({ success: false, error: "contractor already exist" });
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
    res.status(200).json({ success: true, data: newContractor });
  } catch (error) {
    console.log(error);
    res.status(404).json({ success: false, error: error.message });
  }
};

// login

const contractorLogin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(404)
      .json({ success: false, message: "All fields are required" });
  }

  // email validation
  if (!email.includes("@") || !email.includes(".")) {
    return res
      .status(404)
      .json({ success: false, message: "please enter valid email" });
  }

  try {
    const existContractor = await Contractor.findOne({ email });

    if (!existContractor) {
      return res
        .status(404)
        .json({ success: false, message: "contractor not registered" });
    }

    // compare password
    const match = await bcrypt.compare(password, existContractor.password);

    if (!match) {
      return res
        .status(404)
        .json({ success: false, message: "Invalid credentials" });
    }

    // generate token
    const token = Jwt.sign(
      { userId: existContractor._id, role: existContractor.role },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "30d",
      }
    );

    res.status(200).json({
      success: true,
      message: "user successfully login",
      data: { token: token, role: existContractor.role },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};
export { contractorRegister, contractorLogin };
