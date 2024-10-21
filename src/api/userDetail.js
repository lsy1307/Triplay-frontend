import { GetAxiosInstance } from '../axios/AxiosMethod';
import defaultProfileImage from '../assets/images/default-profile-image.png';

// 유저 ID를 가져오는 함수
export const fetchUserId = async () => {
  try {
    const response = await GetAxiosInstance('/');
    return response.data.userId;
  } catch (error) {
    console.error('Error fetching user ID:', error);
    throw error;
  }
};

// 유저 세부 정보를 가져오는 함수
export const fetchUserDetail = async (userId) => {
  try {
    if (!userId) {
      userId = await fetchUserId();
    }

    // 유저 정보 가져오기
    const userResponse = await GetAxiosInstance(`/user/${userId}`);

    // 프로필 이미지 가져오기
    const profileImageResponse = await GetAxiosInstance(
      `/file/image/profile/${userId}`
    );

    const profilePicUrl =
      profileImageResponse.data === "default"
        ? defaultProfileImage
        : profileImageResponse.data;

    return {
      ...userResponse.data,
      profilePicUrl,
    };
  } catch (error) {
    console.error('Error fetching user details:', error);
    throw error;
  }
};
