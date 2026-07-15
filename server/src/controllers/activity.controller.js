import Activity from "../models/activity.js";

export const getActivities = async (req, res) => {

  try {

    const activities = await Activity.find({
      task: req.params.taskId,
    })
      .populate("user", "name")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: activities.length,
      data: activities,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};