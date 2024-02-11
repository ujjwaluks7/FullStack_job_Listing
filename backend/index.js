import express from "express";
const app = express();
const PORT = process.env.PORT || 8090;

app.get("/", (req, res) => {
  res.status(200).json("Hello");
});

app.listen(PORT, () => {
  console.log(`Server is start in PORT ${PORT}`);
});
