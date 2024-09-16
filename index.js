import dotenv from "dotenv";
import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import router from "./routes/crypto.routes.js";
dotenv.config({
  path: "./config/.env",
});

const app = express();
const PORT = process.env.PORT || 8080;
app.use(cors());
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

app.listen(PORT, async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("DB connected");
    console.log(`Server running on port ${PORT}`);
  } catch (error) {
    console.log("500 Internal Server Error");
  }
});

app.use("/api", router);
