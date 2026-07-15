import User from "../models/user.js";

// Get all users
export const getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");

    res.json({
      success: true,
      count: users.length,
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export const changeUserRole = async (req, res) => {
    try {
      const { role } = req.body;
  
      if (!["admin", "member"].includes(role)) {
        return res.status(400).json({
          success: false,
          message: "Invalid role",
        });
      }
  
      const user = await User.findById(req.params.id);
  
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }
  
      user.role = role;
  
      await user.save();
  
      res.status(200).json({
        success: true,
        message: "User role updated successfully",
        data: user,
      });
  
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };
  export const changeUserStatus = async (req, res) => {
    try {
      const { isActive } = req.body;
  
      const user = await User.findById(req.params.id);
  
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }
  
      user.isActive = isActive;
  
      await user.save();
  
      res.status(200).json({
        success: true,
        message: "User status updated successfully",
        data: user,
      });
  
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };
  export const getUser = async (req, res) => {
    try {
      const user = await User.findById(req.params.id).select("-password");
  
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }
  
      res.status(200).json({
        success: true,
        data: user,
      });
  
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };
  export const updateUser = async (req, res) => {
    try {
      const { name, email } = req.body;
  
      const user = await User.findById(req.params.id);
  
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }
  
      if (name) user.name = name;
      if (email) user.email = email;
  
      await user.save();
  
      res.status(200).json({
        success: true,
        message: "User updated successfully",
        data: user,
      });
  
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };