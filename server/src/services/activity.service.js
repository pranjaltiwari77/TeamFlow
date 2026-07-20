import API from "../api/axios";

export const getActivities = async (taskId) => {
  const res = await API.get(`/tasks/${taskId}/activity`);

  return res.data;
};