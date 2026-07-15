import express from "express";

import {
  adminDashboard,
  memberDashboard,
} from "../controllers/dashboard.controller.js";

import { protect } from "../middleware/auth.middleware.js";
import { authorize } from "../middleware/role.middleware.js";

const router = express.Router();

router.get(
  "/admin",
  protect,
  authorize("admin"),
  adminDashboard
);

router.get(
  "/member",
  protect,
  memberDashboard
);

export default router;