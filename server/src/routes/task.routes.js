import express from "express";
import { createTask, getTasks, deleteTask, updateTask,updateTaskStatus, getTaskById, getOverdueTasks} from "../controllers/task.controller.js";
import { protect } from "../middleware/auth.middleware.js";
import { authorize } from "../middleware/role.middleware.js";
import checkObjectId from "../middleware/checkobjectid.middlware.js";

const router = express.Router();
router.post("/", protect, authorize("admin"), createTask);
router.get("/overdue", protect, getOverdueTasks); 
router.get("/", protect, getTasks); 
router.put("/:id", protect, authorize("admin"), updateTask); 
router.delete("/:id", protect, authorize("admin"), deleteTask);
router.patch("/:id/status", protect, updateTaskStatus);  
router.get("/:id", protect, checkObjectId, getTaskById);


export default router;