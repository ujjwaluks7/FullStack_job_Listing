import mongoose from "mongoose";
import bcrypt from "bcryptjs";

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
      default:
        "https://res.cloudinary.com/dm5jioyem/image/upload/v1706093961/brzp04glbrjsnmygxidc.png",
    },
    isBlock: {
      type: Boolean,
      required: true,
      default: false,
    },
    posts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
    role: {
      type: String,
      required: true,
      enum: ["Labour", "Contractor", "Admin"],
      default: "Contractor",
    },
  },
  { timestamps: true }
);

contractorSchema.pre("save", async function () {
  this.password = await bcrypt.hash(this.password, 13);
});

const Contractor = mongoose.model("Contractor", contractorSchema);
export default Contractor;
