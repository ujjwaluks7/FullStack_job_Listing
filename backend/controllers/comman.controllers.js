import Contractor from "../models/contractor.model.js";
import Labour from "../models/labour.model.js";
import bcrypt from "bcryptjs";
import Jwt from "jsonwebtoken";

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
      { userId: existUser._id, role: existUser.role },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "30d",
      }
    );

    res.status(200).json({
      success: true,
      message: "user successfully login",
      data: { token: token, role: existUser.role },
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
