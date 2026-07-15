import express from "express";

import {
  getUsers,
  getUser,
  updateUser,
  changeUserStatus,
  changeUserRole,
} from "../controllers/user.controller.js";

import { protect } from "../middleware/auth.middleware.js";
import { authorize } from "../middleware/role.middleware.js";
import checkObjectId from "../middleware/checkobjectid.middlware.js";

const router = express.Router();

router.get("/", protect, authorize("admin"), getUsers);

router.get("/:id", protect, authorize("admin"), checkObjectId, getUser);

router.put("/:id", protect, authorize("admin"), checkObjectId, updateUser);

router.patch("/:id/status", protect, authorize("admin"), checkObjectId, changeUserStatus);

router.patch("/:id/role", protect, authorize("admin"), checkObjectId, changeUserRole);

export default router;