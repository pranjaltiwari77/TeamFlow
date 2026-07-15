import mongoose from "mongoose";

const checkObjectId = (req, res, next) => {
  const { id, taskId, userId } = req.params;

  const value = id || taskId || userId;

  if (value && !mongoose.Types.ObjectId.isValid(value)) {
    return res.status(400).json({
      success: false,
      message: "Invalid MongoDB ID",
    });
  }

  next();
};

export default checkObjectId;