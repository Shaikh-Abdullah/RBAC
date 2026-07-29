import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

import rolesRoute from "./routes/roles";
import authRoute from "./routes/auth";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/roles", rolesRoute);
app.use("/api/auth", authRoute);

const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URL as string;

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });
