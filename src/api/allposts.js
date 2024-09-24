import { GetAxiosInstance } from '../axios/AxiosMethod';

export const fetchPosts = async () => {
  try {
    const response = await GetAxiosInstance(`/post`);
    return response.data;
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
};
