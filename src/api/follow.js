import axios from "axios";

export const checkIfFollowing = async (toUserId, fromUserId) => {
            try {
                const response = await axios.get(`/follow/${post.userId}/${post.currentUserId}`);
                return response.data;
            } catch (error) {
                throw new Error('팔로우 여부 확인 실패');
            }
};
        
export const followUser = async (toUserId, fromUserId) => {
    try {
        const response = await axios.post(`/follow/${post.userId}/${post.currentUserId}`);
        return response.data;
    } catch (error) {
        throw new Error('팔로우 요청 실패');
    }
};

export const unfollowUser = async (toUserId, fromUserId) => {
    try {
        const response = await axios.delete(`/follow/${post.userId}/${post.currentUserId}`);
        return response.data;
    } catch (error) {
        throw new Error('언팔로우 요청 실패');
    }
}
