import express from "express";
import { createProject } from "../controllers/project.controller.js";
import { protect } from "../middleware/auth.middleware.js";
import { authorize } from "../middleware/role.middleware.js";
import {getProjects,getProjectById,updateProject,deleteProject,addMembers}from "../controllers/project.controller.js";
import {
    addComment,
    getComments,
  } from "../controllers/comment.controller.js";

const router = express.Router();


router.post("/", protect, authorize("admin"), createProject);
router.get("/", protect, getProjects);
router.get("/:id", protect, getProjectById);
router.put("/:id", protect, authorize("admin"), updateProject);
router.delete("/:id", protect, authorize("admin"), deleteProject);
router.post("/:id/members", protect, authorize("admin"), addMembers);
router.get("/:taskId/comments", protect, getComments);


export default router;