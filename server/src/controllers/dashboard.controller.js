import User from "../models/user.js";
import Project from "../models/project.js";
import Task from "../models/task.js";

export const adminDashboard = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();

    const totalProjects = await Project.countDocuments();

    const activeProjects = await Project.countDocuments({
      status: "Active",
    });

    const completedProjects = await Project.countDocuments({
      status: "Completed",
    });

    const totalTasks = await Task.countDocuments();

    const pendingTasks = await Task.countDocuments({
      status: "Pending",
    });

    const inProgressTasks = await Task.countDocuments({
      status: "In Progress",
    });

    const completedTasks = await Task.countDocuments({
      status: "Completed",
    });

    const overdueTasks = await Task.countDocuments({
      dueDate: { $lt: new Date() },
      status: { $ne: "Completed" },
    });

    res.status(200).json({
      success: true,
      data: {
        totalUsers,
        totalProjects,
        activeProjects,
        completedProjects,
        totalTasks,
        pendingTasks,
        inProgressTasks,
        completedTasks,
        overdueTasks,
      },
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};
export const memberDashboard = async (req, res) => {

    try {
  
      const myProjects = await Project.countDocuments({
        members: req.user._id,
      });
  
      const myTasks = await Task.countDocuments({
        assignedTo: req.user._id,
      });
  
      const pendingTasks = await Task.countDocuments({
        assignedTo: req.user._id,
        status: "Pending",
      });
  
      const inProgressTasks = await Task.countDocuments({
        assignedTo: req.user._id,
        status: "In Progress",
      });
  
      const completedTasks = await Task.countDocuments({
        assignedTo: req.user._id,
        status: "Completed",
      });
  
      const overdueTasks = await Task.countDocuments({
        assignedTo: req.user._id,
        dueDate: { $lt: new Date() },
        status: { $ne: "Completed" },
      });
  
      res.json({
        success: true,
        data: {
          myProjects,
          myTasks,
          pendingTasks,
          inProgressTasks,
          completedTasks,
          overdueTasks,
        },
      });
  
    } catch (error) {
  
      res.status(500).json({
        success: false,
        message: error.message,
      });
  
    }
  
  };