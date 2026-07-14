import express from "express";
import { createProject } from "../controllers/project.controller.js";
import { protect } from "../middleware/auth.middleware.js";
import { authorize } from "../middleware/role.middleware.js";
import {getProjects} from "../controllers/project.controller.js";

const router = express.Router();

router.post("/", protect, authorize("admin"), createProject);
router.get("/", protect, getProjects);


export default router;