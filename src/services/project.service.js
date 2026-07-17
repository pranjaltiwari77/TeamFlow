import API from "../api/axios";

export const getProjects = async () => {
  const response = await API.get("/projects");
  return response.data;
};

export const createProject = async (data) => {
  const response = await API.post("/projects", data);
  return response.data;
};

export const deleteProject = async (id) => {
  const response = await API.delete(`/projects/${id}`);
  return response.data;
};