import express from "express";
import dotenv from "dotenv";
import dbConnect from "./config/dbConnection.js";
import labourRoute from "./routes/labour.routes.js";
import contractorRoute from "./routes/contractor.routes.js";
import commonRoute from "./routes/comman.routes.js";
import cookieParser from "cookie-parser";
import cors from "cors";
dotenv.config();

dbConnect();

const app = express();
const PORT = process.env.PORT || 8090;

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use("/api/v1/labour", labourRoute);
app.use("/api/v1/contractor", contractorRoute);
app.use("/api/v1/", commonRoute);

app.get("/", (req, res) => {
  res.status(200).json("Hello");
});

app.listen(PORT, () => {
  console.log(`Server is start in PORT ${PORT}`);
});
