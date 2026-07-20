import API from "../api/axios";

export const getDashboardData = async () => {
  const response = await API.get("/dashboard/admin");
  return response.data;
};