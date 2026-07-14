import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";

import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";



dotenv.config();

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
//app.use(helmet());
app.use(morgan("dev"));
app.use(cookieParser());
app.use("/api/users", userRoutes);


app.use("/api/auth", authRoutes);
import { protect } from "./middleware/auth.middleware.js";

app.get("/api/test", protect, (req, res) => {
  res.json({
    success: true,
    message: "Protected Route Working",
    user: req.user,
  });
});

app.get("/", (req, res) => {
    res.send("TeamFlow API is Running...");
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});