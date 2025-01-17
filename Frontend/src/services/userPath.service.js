import axiosInstance from "./axiosInstance";

const listUserPaths = async () => {
  const response = await axiosInstance.get("/api/userPath");
  return response.data;
};

const getUserPathByUserName = async (username) => {
  const response = await axiosInstance.get(
    `/api/userPath/username/${username}`
  );
  return response.data;
};

const createUserPath = async (gamePathId) => {
  const response = await axiosInstance.post(`/api/userPath/${gamePathId}`);
  return response.data;
};

const updateUserPath = async (id, formData) => {
  const response = await axiosInstance.put(`/api/userPath/${id}`, formData);
  return response.data;
};

const deleteUserPath = async (id) => {
  const response = await axiosInstance.delete(`/api/userPath/${id}`);
  return response.data;
};

// EXTRA

export default {
  listUserPaths,
  getUserPathByUserName,
  createUserPath,
  updateUserPath,
  deleteUserPath,
};
