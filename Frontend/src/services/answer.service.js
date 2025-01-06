import axiosInstance from "./axiosInstance";

const listAnswers = async () => {
  const response = await axiosInstance.get("/api/answer");
  return response.data;
};

const addAnswer = async (formData) => {
  const response = await axiosInstance.post("/api/answer", formData);
  return response.data;
};

const updateAnswer = async (id, formData) => {
  const response = await axiosInstance.put(`/api/answer/${id}`, formData);
  return response.data;
};

const deleteAnswer = async (id) => {
  const response = await axiosInstance.delete(`/api/answer/${id}`);
  return response.data;
};

export default {
  listAnswers,
  addAnswer,
  updateAnswer,
  deleteAnswer,
};
