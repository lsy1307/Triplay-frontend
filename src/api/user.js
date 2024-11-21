import { GetAxiosInstance } from '../axios/AxiosMethod';
import defaultProfileImage from '../assets/images/default-profile-image.png';

export const fetchCurrentUser = async () => {
  try {
    const response = await GetAxiosInstance('/');
    return response.data;
  } catch (error) {
      console.error('Error fetching user details:', error);
    throw error;
  }
};

// 유저 세부 정보를 가져오는 함수
export const fetchUserDetail = async () => {
  try {
    // 사용자 정보 가져오기
    const response = await GetAxiosInstance('/profile');
    const { userName, email, profileUrl } = response.data;

    // 프로필 이미지가 기본 값일 경우 처리
    const resolvedProfileUrl =
      profileUrl === 'default' || !profileUrl ? defaultProfileImage : profileUrl;

    // 유저 정보 반환
    return {
      userName,
      email,
      profileUrl: resolvedProfileUrl, // 최종 프로필 URL
    };
    
  } catch (error) {
    console.error('Error fetching user details:', error);
    throw error;
  }
};
