import API from "../api/axios";

export const getTasks = async () => {
  const response = await API.get("/tasks");
  return response.data;
};

export const createTask = async (taskData) => {
  const response = await API.post("/tasks", taskData);
  return response.data;
};
export const updateTaskStatus = async (id, status) => {
    const response = await API.patch(`/tasks/${id}/status`, {
      status,
    });
  
    return response.data;
  };
  export const deleteTask = async (id) => {
    const response = await API.delete(`/tasks/${id}`);
    return response.data;
  };
  export const getFilteredTasks = async (params) => {
    const response = await API.get("/tasks", {
      params,
    });
  
    return response.data;
  };
  export const updateTask = async (id, taskData) => {
    const response = await API.put(`/tasks/${id}`, taskData);
    return response.data;
  };
  export const getTaskById = async (id) => {
    const response = await API.get(`/tasks/${id}`);
    return response.data;
  };