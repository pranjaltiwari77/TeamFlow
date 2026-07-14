import User from "../models/user.js";

export const getUsers = async (req, res) => {
  const users = await User.find().select("-password");

  res.json({
    success: true,
    count: users.length,
    users,
  });
};

export const getUserById = async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");

  res.json({
    success: true,
    user,
  });
};

export const updateUser = async (req, res) => {
  const user = await User.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  ).select("-password");

  res.json({
    success: true,
    user,
  });
};

export const changeUserStatus = async (req, res) => {
  const user = await User.findById(req.params.id);

  user.isActive = !user.isActive;

  await user.save();

  res.json({
    success: true,
    message: "User status updated",
  });
};