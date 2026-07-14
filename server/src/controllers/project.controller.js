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