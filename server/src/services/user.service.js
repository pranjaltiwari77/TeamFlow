import API from "../api/axios";

export const getUsers = async () => {
  const response = await API.get("/users");
  return response.data;
};
export const updateTask = async (id, taskData) => {
    const response = await API.put(`/tasks/${id}`, taskData);
    return response.data;
  };
  export const changeUserStatus = async (id, isActive) => {
    const response = await API.patch(`/users/${id}/status`, {
      isActive,
    });
  
    return response.data;
  };
  
  export const changeUserRole = async (id, role) => {
    const response = await API.patch(`/users/${id}/role`, {
      role,
    });
  
    return response.data;
  };