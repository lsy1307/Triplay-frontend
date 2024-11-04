import { PostAxiosInstance } from '../axios/AxiosMethod';

export const uploadProfileImage = async (file) => {
  try {
    const formData = new FormData();
    formData.append('file', file);

    const response = await PostAxiosInstance('/file/image/user/profile', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    return response.data;
  } catch (error) {
    console.error('Error uploading profile image:', error);
    throw error;
  }
};
