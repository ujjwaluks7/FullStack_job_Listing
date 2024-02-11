import mongoose from "mongoose";

const contractorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    gender: {
      type: String,
      enum: ["Male", "Female"],
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
      minlength: 10,
    },
    address: {
      type: String,
      required: true,
    },
    companyName: {
      type: String,
    },
    companyAddress: {
      type: String,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    profilePic: {
      type: String,
    },
    isBlock: {
      type: Boolean,
      required: true,
      default: false,
    },
    role: {
      type: String,
      required: true,
      enum: ["Labour", "Contractor", "Admin"],
      default: "Contractor",
    },
  },
  { timestamps: true }
);

const Labour = mongoose.model("Labour", labourSchema);
export default Labour;
