import {
  GetAxiosInstance,
  PostAxiosInstance,
  DeleteAxiosInstance,
} from '../axios/AxiosMethod';

export const checkIfFollowing = async (fromUserId) => {
  try {
    const response = await GetAxiosInstance(
      `/follow/is-following/${fromUserId}`,
    );
    return response.data;
  } catch (error) {
    throw new Error('팔로우 여부 확인 실패');
  }
};

export const followUser = async (fromUserId) => {
  try {
    const response = await PostAxiosInstance(
      `/follow/${fromUserId}`,
    );
    return response.data;
  } catch (error) {
    throw new Error('팔로우 요청 실패');
  }
};

export const unfollowUser = async (fromUserId) => {
  try {
    const response = await DeleteAxiosInstance(
      `/follow/${fromUserId}`,
    );
    return response.data;
  } catch (error) {
    throw new Error('언팔로우 요청 실패');
  }
};
