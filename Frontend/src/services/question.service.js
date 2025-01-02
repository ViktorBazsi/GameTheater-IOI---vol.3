import axiosInstance from "./axiosInstance";

const listQuestions = async () => {
  const response = await axiosInstance.get("/api/question");
  return response.data;
};

const getQuestionByNumber = async (number) => {
  const response = await axiosInstance.get(`/api/question/number/${number}`);
  return response.data;
};

const addQuestion = async (formData) => {
  const response = await axiosInstance.post("/api/question", formData);
  return response.data;
};

const updateQuestion = async (id, formData) => {
  const response = await axiosInstance.put(`/api/question/${id}`, formData);
  return response.data;
};

const deleteQuestion = async (id) => {
  const response = await axiosInstance.delete(`/api/question/${id}`);
  return response.data;
};

export default {
  listQuestions,
  getQuestionByNumber,
  addQuestion,
  updateQuestion,
  deleteQuestion,
};
