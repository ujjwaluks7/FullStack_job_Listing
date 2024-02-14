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

export { labourRegister };
