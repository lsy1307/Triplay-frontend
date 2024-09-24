import { GetAxiosInstance } from '../axios/AxiosMethod';

export const fetchFileDetails = async (postId) => {
  try {
    const response = await GetAxiosInstance(`/file/image/${postId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching file details:', error);
    throw error;
  }
};
