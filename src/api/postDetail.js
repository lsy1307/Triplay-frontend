import { GetAxiosInstance } from '../axios/AxiosMethod';

export const fetchPostDetail = async (postId) => {
  try {
    const response = await GetAxiosInstance(`/post/${postId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching post:', error);
    throw error;
  }
};
