import Activity from "../models/activity.js";

const logActivity = async (
  task,
  user,
  action,
  previousValue = "",
  newValue = ""
) => {
  await Activity.create({
    task,
    user,
    action,
    previousValue,
    newValue,
  });
};

export default logActivity;