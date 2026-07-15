import Project from "../models/project.js";

export const createProject = async (req, res) => {
  try {
    const {
      name,
      description,
      status,
      startDate,
      dueDate,
      members,
    } = req.body;

    const project = await Project.create({
      name,
      description,
      status,
      startDate,
      dueDate,
      members,
      createdBy: req.user._id,
    });

    res.status(201).json({
      success: true,
      message: "Project Created Successfully",
      data: project,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export const getProjects = async (req, res) => {
    try {
      let projects;
  
      if (req.user.role === "admin") {
        // Admin can see all projects
        projects = await Project.find()
          .populate("createdBy", "name email")
          .populate("members", "name email");
      } else {
        // Members can only see projects they belong to
        projects = await Project.find({
          members: req.user._id,
        })
          .populate("createdBy", "name email")
          .populate("members", "name email");
      }
  
      res.status(200).json({
        success: true,
        count: projects.length,
        data: projects,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };
  export const getProjectById = async (req, res) => {
    try {
      const project = await Project.findById(req.params.id)
        .populate("createdBy", "name email")
        .populate("members", "name email");
  
      if (!project) {
        return res.status(404).json({
          success: false,
          message: "Project not found",
        });
      }
  
      // Member can only access their own projects
      if (
        req.user.role !== "admin" &&
        !project.members.some(
          (member) => member._id.toString() === req.user._id.toString()
        )
      ) {
        return res.status(403).json({
          success: false,
          message: "Access denied",
        });
      }
  
      res.status(200).json({
        success: true,
        data: project,
      });
  
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };
  export const updateProject = async (req, res) => {
    try {
      const project = await Project.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
          runValidators: true,
        }
      );
  
      if (!project) {
        return res.status(404).json({
          success: false,
          message: "Project not found",
        });
      }
  
      res.json({
        success: true,
        message: "Project updated",
        data: project,
      });
  
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };
  export const deleteProject = async (req, res) => {
    try {
      const project = await Project.findById(req.params.id);
  
      if (!project) {
        return res.status(404).json({
          success: false,
          message: "Project not found",
        });
      }
  
      await project.deleteOne();
  
      res.json({
        success: true,
        message: "Project deleted successfully",
      });
  
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };
  import User from "../models/user.js";

  export const addMembers = async (req, res) => {
    try {
      const { userId } = req.body;
  
      const project = await Project.findById(req.params.id);
  
      if (!project) {
        return res.status(404).json({
          success: false,
          message: "Project not found",
        });
      }
  
      const user = await User.findById(userId);
  
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }
  
      const alreadyMember = project.members.some(
        (member) => member.toString() === userId
      );
  
      if (alreadyMember) {
        return res.status(400).json({
          success: false,
          message: "User is already a member",
        });
      }
  
      project.members.push(userId);
  
      await project.save();
  
      const updatedProject = await Project.findById(project._id)
        .populate("members", "name email role");
  
      res.status(200).json({
        success: true,
        message: "Member added successfully",
        data: updatedProject,
      });
  
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };