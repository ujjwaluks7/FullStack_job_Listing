import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    jobName: {
      type: String,
      required: true,
    },
    jobDescription: {
      type: String,
      required: true,
    },
    requiredSkill: {
      type: String,
      required: true,
    },
    jobType: {
      type: String,
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Contractor",
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    district: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    pincode: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    postPic: {
      type: String,
    },
    totalApplied: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Labour",
      },
    ],
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);
export default Post;
