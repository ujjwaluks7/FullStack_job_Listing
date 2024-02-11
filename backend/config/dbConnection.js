import mongoose from "mongoose";

const dbConnect = async () => {
  console.log(process.env.DB_URL);
  try {
    const res = await mongoose.connect(process.env.DB_URL);
    console.log("DB connected ");
  } catch (error) {
    console.log(`DB connection Faild ${error}`);
  }
};

export default dbConnect;
