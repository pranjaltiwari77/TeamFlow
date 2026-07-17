import Task from "../models/task.js";
import logActivity from "../utils/activitylogger.js";
import Project from "../models/project.js";
import User from "../models/user.js";

export const createTask = async (req, res) => {
    try {
      const {
        title,
        description,
        project,
        assignedTo,
        priority,
        status,
        startDate,
        dueDate,
      } = req.body;
  
      // Check Project
      const existingProject = await Project.findById(project);
  
      if (!existingProject) {
        return res.status(404).json({
          success: false,
          message: "Project not found",
        });
      }
  
      // Check User
      const existingUser = await User.findById(assignedTo);
  
      if (!existingUser) {
        return res.status(404).json({
          success: false,
          message: "Assigned user not found",
        });
      }
  
      // Check Membership
      if (!existingProject.members.includes(assignedTo)) {
        return res.status(400).json({
          success: false,
          message: "User is not a member of this project",
        });
      }
  
      const task = await Task.create({
        title,
        description,
        project,
        assignedTo,
        priority,
        status,
        startDate,
        dueDate,
        createdBy: req.user._id,
      });
      await logActivity(
        task._id,
        req.user._id,
        "Task Created",
        "",
        task.title
      );
  
      res.status(201).json({
        success: true,
        message: "Task created successfully",
        data: task,
      });
  
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

export const getTasks = async (req, res) => {
    try {
      const {
        search,
        status,
        priority,
        page = 1,
        limit = 10,
        sort = "createdAt",
      } = req.query;
  
      let query = {};
  
      // Member restriction
      if (req.user.role !== "admin") {
        query.assignedTo = req.user._id;
      }
  
      // Search
      if (search) {
        query.title = {
          $regex: search,
          $options: "i",
        };
      }
  
      // Status filter
      if (status) {
        query.status = status;
      }
  
      // Priority filter
      if (priority) {
        query.priority = priority;
      }
  
      const total = await Task.countDocuments(query);
  
      const tasks = await Task.find(query)
        .populate("project", "name")
        .populate("assignedTo", "name email")
        .populate("createdBy", "name")
        .sort({ [sort]: 1 })
        .skip((page - 1) * limit)
        .limit(Number(limit));
  
      res.json({
        success: true,
        currentPage: Number(page),
        totalPages: Math.ceil(total / limit),
        totalRecords: total,
        recordsPerPage: Number(limit),
        data: tasks,
      });
  
    } catch (error) {
  
      res.status(500).json({
        success: false,
        message: error.message,
      });
  
    }
  };
  
export const updateTask = async (req, res) => {
    try {
      const task = await Task.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
          runValidators: true,
        }
      )
        .populate("project", "name")
        .populate("assignedTo", "name email");
  
      if (!task) {
        return res.status(404).json({
          success: false,
          message: "Task not found",
        });
      }
      if (
        req.user.role !== "admin" &&
        task.assignedTo.toString() !== req.user._id.toString()
      ) {
        return res.status(403).json({
          success: false,
          message: "You can update only your assigned tasks",
        });
      }
      await logActivity(
        task._id,
        req.user._id,
        "Task Updated",
        oldTitle,
        task.title
      );
  
      res.status(200).json({
        success: true,
        message: "Task updated successfully",
        data: task,
      });
  
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };
  
  export const deleteTask = async (req, res) => {
    try {
  
      const task = await Task.findById(req.params.id);
  
      if (!task) {
        return res.status(404).json({
          success: false,
          message: "Task not found",
        });
      }
  
      await task.deleteOne();
  
      res.json({
        success: true,
        message: "Task deleted successfully",
      });
      await logActivity(
        task._id,
        req.user._id,
        "Task Deleted",
        task.title,
        ""
      );
  
    } catch (error) {
  
      res.status(500).json({
        success: false,
        message: error.message,
      });
  
    }
  };
  export const updateTaskStatus = async (req, res) => {
    try {
      const { status } = req.body;
  
      const task = await Task.findById(req.params.id);
  
      if (!task) {
        return res.status(404).json({
          success: false,
          message: "Task not found",
        });
      }
  
      // Only admin or assigned member
      if (
        req.user.role !== "admin" &&
        task.assignedTo.toString() !== req.user._id.toString()
      ) {
        return res.status(403).json({
          success: false,
          message: "You can update only your assigned tasks",
        });
      }
  
      // Save old status before updating
      const previousStatus = task.status;
  
      task.status = status;
  
      await task.save();
  
      // Log activity
      await logActivity(
        task._id,
        req.user._id,
        "Status Changed",
        previousStatus,
        status
      );
  
      res.status(200).json({
        success: true,
        message: "Task status updated successfully",
        data: task,
      });
  
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };
  export const getOverdueTasks = async (req, res) => {
    try {
      let query = {
        dueDate: { $lt: new Date() },
        status: { $ne: "Completed" },
      };
  
      // Member sirf apne overdue tasks dekhega
      if (req.user.role !== "admin") {
        query.assignedTo = req.user._id;
      }
  
      const tasks = await Task.find(query)
        .populate("project", "name")
        .populate("assignedTo", "name email");
  
      res.status(200).json({
        success: true,
        count: tasks.length,
        data: tasks,
      });
  
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };
  export const getTaskById = async (req, res) => {
    try {
      const task = await Task.findById(req.params.id)
        .populate("project", "name members")
        .populate("assignedTo", "name email")
        .populate("createdBy", "name");
  
      if (!task) {
        return res.status(404).json({
          success: false,
          message: "Task not found",
        });
      }
  
      // Admin can access every task
      if (req.user.role !== "admin") {
  
        const isMember = task.project.members.some(
          (member) => member.toString() === req.user._id.toString()
        );
  
        if (!isMember) {
          return res.status(403).json({
            success: false,
            message: "Access denied",
          });
        }
      }
  
      res.status(200).json({
        success: true,
        data: task,
      });
  
    } catch (error) {
  
      res.status(500).json({
        success: false,
        message: error.message,
      });
  
    }
  };