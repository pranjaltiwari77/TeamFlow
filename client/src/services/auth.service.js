import API from "../api/axios";

export const loginUser = async (data) => {
  const response = await API.post("/auth/login", data);
  return response.data;
};
export const updateProfile = async (data) => {
    const response = await API.put(
      "/auth/profile",
      data,
      {
        headers: {
          "Content-Type":
            "multipart/form-data",
        },
      }
    );
  
    return response.data;
  };
  export const changePassword = async (data) => {
    const response = await API.put("/auth/change-password", data);
    return response.data;
  };