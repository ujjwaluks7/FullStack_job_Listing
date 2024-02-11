import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const labourSchema = new mongoose.Schema(
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
      enum: ["male", "female"],
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
    },
    skills: [
      {
        type: String,
      },
    ],
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
      default: "Labour",
    },
  },
  { timestamps: true }
);

labourSchema.pre("save", async function () {
  this.password = await bcrypt.hash(this.password, 13);
});

const Labour = mongoose.model("Labour", labourSchema);
export default Labour;
