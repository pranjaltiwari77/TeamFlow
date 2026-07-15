import express from "express";
import { getActivities } from "../controllers/activity.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/:taskId/activity", protect, getActivities);

export default router;