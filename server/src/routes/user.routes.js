import express from "express";
import {
  getUsers,
  getUserById,
  updateUser,
  changeUserStatus,
} from "../controllers/user.controller.js";

import { protect } from "../middleware/auth.middleware.js";
import { authorize } from "../middleware/role.middleware.js";

const router = express.Router();

router.get("/", protect, authorize("admin"), getUsers);
router.get("/:id", protect, authorize("admin"), getUserById);
router.put("/:id", protect, authorize("admin"), updateUser);
router.patch("/:id/status", protect, authorize("admin"), changeUserStatus);

export default router;