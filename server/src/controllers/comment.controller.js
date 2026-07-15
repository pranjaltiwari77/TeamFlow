import Comment from "../models/comment.js";
import Task from "../models/task.js";
import logActivity from "../utils/activitylogger.js";

// =====================
// Add Comment
// =====================
export const addComment = async (req, res) => {
  try {
    const { comment } = req.body;

    if (!comment) {
      return res.status(400).json({
        success: false,
        message: "Comment is required",
      });
    }

    const task = await Task.findById(req.params.taskId).populate("project");

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    // Only project members or admin
    if (
      req.user.role !== "admin" &&
      !task.project.members.some(
        (member) => member.toString() === req.user._id.toString()
      )
    ) {
      return res.status(403).json({
        success: false,
        message: "You are not a member of this project",
      });
    }

    const newComment = await Comment.create({
      task: req.params.taskId,
      user: req.user._id,
      comment,
    });

    await logActivity(
      task._id,
      req.user._id,
      "Comment Added"
    );

    res.status(201).json({
      success: true,
      message: "Comment added successfully",
      data: newComment,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =====================
// Get Comments
// =====================
export const getComments = async (req, res) => {
  try {
    const comments = await Comment.find({
      task: req.params.taskId,
    })
      .populate("user", "name profileImage")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: comments.length,
      data: comments,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =====================
// Update Comment
// =====================
export const updateComment = async (req, res) => {
  try {
    const { comment } = req.body;

    const existingComment = await Comment.findById(req.params.id);

    if (!existingComment) {
      return res.status(404).json({
        success: false,
        message: "Comment not found",
      });
    }

    // Only owner or admin
    if (
      req.user.role !== "admin" &&
      existingComment.user.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({
        success: false,
        message: "You can edit only your own comment",
      });
    }

    existingComment.comment = comment;

    await existingComment.save();

    res.status(200).json({
      success: true,
      message: "Comment updated successfully",
      data: existingComment,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =====================
// Delete Comment
// =====================
export const deleteComment = async (req, res) => {
  try {
    const existingComment = await Comment.findById(req.params.id);

    if (!existingComment) {
      return res.status(404).json({
        success: false,
        message: "Comment not found",
      });
    }

    // Only owner or admin
    if (
      req.user.role !== "admin" &&
      existingComment.user.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({
        success: false,
        message: "You can delete only your own comment",
      });
    }

    await existingComment.deleteOne();

    res.status(200).json({
      success: true,
      message: "Comment deleted successfully",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};