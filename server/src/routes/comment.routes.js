import express from "express";
import {
  addComment,
  getComments,
  updateComment,
  deleteComment,
} from "../controllers/comment.controller.js";

import { protect } from "../middleware/auth.middleware.js";
import checkObjectId from "../middleware/checkobjectid.middlware.js";


const router = express.Router();

router.post("/:taskId/comments", protect, checkObjectId, addComment);

router.get("/:taskId/comments", protect, checkObjectId, getComments);

router.put("/:id", protect, checkObjectId, updateComment);

router.delete("/:id", protect, checkObjectId, deleteComment);

export default router;