import axiosInstance from "./axiosInstance";

const listGamePaths = async () => {
  const response = await axiosInstance.get("/api/gamePath");
  return response.data;
};

const getGamePathById = async (id) => {
  const response = await axiosInstance.get(`/api/gamePath/${id}`);
  return response.data;
};

const createGamePath = async (formData) => {
  const response = await axiosInstance.post("/api/gamePath", formData);
  return response.data;
};

const updateGamePath = async (id, formData) => {
  const response = await axiosInstance.put(`/api/gamePath/${id}`, formData);
  return response.data;
};

const deleteGamePath = async (id) => {
  const response = await axiosInstance.delete(`/api/gamePath/${id}`);
  return response.data;
};

// EXTRA
const updateGamePathByMajority = async (id) => {
  const response = await axiosInstance.update(`api/gamePath/extra(${id})`);
  return response.data;
};

export default {
  listGamePaths,
  getGamePathById,
  createGamePath,
  updateGamePath,
  deleteGamePath,
  updateGamePathByMajority,
};
