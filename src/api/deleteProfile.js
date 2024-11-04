import { DeleteAxiosInstance } from '../axios/AxiosMethod';

export const deleteProfileImage = async () => {
  try {
    const response = await DeleteAxiosInstance(`/file/image/user/profile`);
    return response.data;
  } catch (error) {
    console.error('Error deleting profile image:', error);
    throw error;
  }
};
