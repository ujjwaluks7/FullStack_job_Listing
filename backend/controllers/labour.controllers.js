import Labour from "../models/labour.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

// register
const labourRegister = async (req, res) => {
  const { name, email, gender, age, phone, password } = req.body;

  if (!name || !email || !gender || !age || !phone || !password) {
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
    const existingLabour = await Labour.findOne({ email });
    if (existingLabour) {
      return res
        .status(404)
        .json({ success: false, error: "labour already exist" });
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
    res.status(200).json({ success: newLabour });
  } catch (error) {
    console.log(error);
    res.status(404).json({ error: "Internal server error" });
  }
};

// login

const labourLogin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(404)
      .json({ success: false, message: "All fields are required" });
  }

  // email validation
  if (!email.includes("@" && ".")) {
    return res
      .status(404)
      .json({ success: false, message: "please enter valid email" });
  }

  try {
    const existLabour = await Labour.findOne({ email });

    if (!existLabour) {
      return res
        .status(404)
        .json({ success: false, message: "labour not registered" });
    }

    // compare password
    const match = await bcrypt.compare(password, existLabour.password);

    if (!match) {
      return res.status(404).json({ error: "Invalid credentials" });
    }

    // generate token
    const token = jwt.sign(
      { userId: existLabour._id, role: existLabour.role },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "30d",
      }
    );

    res.status(200).json({
      success: true,
      message: "user successfully login",
      data: { token: token, role: existLabour.role },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export { labourRegister, labourLogin };
