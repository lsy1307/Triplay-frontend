import {
  GetAxiosInstance,
  PostAxiosInstance,
  DeleteAxiosInstance,
} from '../axios/AxiosMethod';

export const checkIfFollowing = async (toUserId, fromUserId) => {
  try {
    const response = await GetAxiosInstance(
      `/follow/${post.userId}/${post.currentUserId}`,
    );
    return response.data;
  } catch (error) {
    throw new Error('팔로우 여부 확인 실패');
  }
};

export const followUser = async (toUserId, fromUserId) => {
  try {
    const response = await PostAxiosInstance(
      `/follow/${post.userId}/${post.currentUserId}`,
    );
    return response.data;
  } catch (error) {
    throw new Error('팔로우 요청 실패');
  }
};

export const unfollowUser = async (toUserId, fromUserId) => {
  try {
    const response = await DeleteAxiosInstance(
      `/follow/${post.userId}/${post.currentUserId}`,
    );
    return response.data;
  } catch (error) {
    throw new Error('언팔로우 요청 실패');
  }
};
