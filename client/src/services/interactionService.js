
import api from "../api/axios";

const getAuthHeaders = () => {

  const token = localStorage.getItem("token");

  return {
    Authorization: `Bearer ${token}`,
  };
};

export const toggleLike = async (postId) => {

  const response = await api.post(
    `/posts/${postId}/like`,
    {},
    {
      headers: getAuthHeaders(),
    }
  );

  return response.data;
};

export const toggleSave = async (postId) => {

  const response = await api.post(
    `/posts/${postId}/save`,
    {},
    {
      headers: getAuthHeaders(),
    }
  );

  return response.data;
};

export const createComment = async (
  postId,
  text
) => {

  const response = await api.post(
    `/posts/${postId}/comment`,
    { text },
    {
      headers: getAuthHeaders(),
    }
  );

  return response.data;
};

export const getComments = async (
  postId
) => {

  const response = await api.get(
    `/posts/${postId}/comments`
  );

  return response.data;
};
