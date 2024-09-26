import { GetAxiosInstance } from '../axios/AxiosMethod';

export const fetchUserDetail = async (userId) => {
  try {
    const token = localStorage.getItem('token');

    const userResponse = await GetAxiosInstance(`/user/${userId}`);

    const profileImageResponse = await GetAxiosInstance(
      `/file/image/profile/${userId}`,
    );

    const profilePicUrl =
      profileImageResponse.data || '/default-profile-image.jpg';

    return {
      ...userResponse.data,
      profilePicUrl,
    };
  } catch (error) {
    console.error('Error fetching user details:', error);
    throw error;
  }
};
