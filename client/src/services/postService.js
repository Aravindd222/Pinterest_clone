import api from "../api/axios";

export const getPosts = async () => {

  const response = await api.get("/posts");

  return response.data;
};