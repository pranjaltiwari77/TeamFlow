import path from "path";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";

import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import projectRoutes from "./routes/project.routes.js";
import taskRoutes from "./routes/task.routes.js";
import dashboardRoutes from "./routes/dashboard.routes.js";


dotenv.config();

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
    cors({
      origin: "http://localhost:5173",
      credentials: true,
    })
  );
//app.use(helmet());
app.use(morgan("dev"));
app.use(cookieParser());
app.use("/api/users", userRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/tasks", taskRoutes);
import commentRoutes from "./routes/comment.routes.js";
import activityRoutes from "./routes/activity.routes.js";
import errorHandler from "./middleware/error.middleware.js";
app.use("/uploads", express.static("src/uploads"));
app.use("/api/tasks", activityRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/uploads", express.static("src/uploads"));


app.use("/api/auth", authRoutes);
import { protect } from "./middleware/auth.middleware.js";
app.use("/api/tasks", commentRoutes);
app.use(errorHandler);
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