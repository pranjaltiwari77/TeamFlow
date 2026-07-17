import API from "../api/axios";

export const getComments = async (taskId) => {
  const res = await API.get(`/tasks/${taskId}/comments`);
  return res.data;
};

export const addComment = async (taskId, comment) => {
  const res = await API.post(`/tasks/${taskId}/comments`, {
    comment,
  });

  return res.data;
};

export const updateComment = async (id, comment) => {
  const res = await API.put(`/tasks/${id}`, {
    comment,
  });

  return res.data;
};

export const deleteComment = async (id) => {
  const res = await API.delete(`/tasks/${id}`);

  return res.data;
};