import express from "express";
import dotenv from "dotenv";
import dbConnect from "./config/dbConnection.js";
import labourRoute from "./routes/labour.routes.js";
dotenv.config();

dbConnect();

const app = express();
const PORT = process.env.PORT || 8090;

app.use(express.json());
app.use("/api/v1/labour", labourRoute);

app.get("/", (req, res) => {
  res.status(200).json("Hello");
});

app.listen(PORT, () => {
  console.log(`Server is start in PORT ${PORT}`);
});
