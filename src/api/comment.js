import { GetAxiosInstance, PostAxiosInstance, PutAxiosInstance, DeleteAxiosInstance } from '../axios/AxiosMethod';

// 댓글 조회
export const fetchComments = async (postId) => {
    const response = await GetAxiosInstance(`/postComment/post/${postId}`);
    return response.data;
};

// 댓글 추가
export const addComment = async (commentData) => {
    const response = await PostAxiosInstance('/postComment', commentData, {
        headers: {
            'Content-Type': 'application/json', // JSON 데이터 전송
        },
    });
    return response.data; // 서버에서 반환된 댓글 데이터
};

// 댓글 수정
export const updateComment = async (postCommentId, updatedData) => {
    const response = await PutAxiosInstance(`/postComment/${postCommentId}`, updatedData, {
        headers: {
            'Content-Type': 'application/json', // JSON 데이터 전송
        },
    });
    return response.data;
};

// 댓글 삭제
export const deleteComment = async (postCommentId) => {
    await DeleteAxiosInstance(`/postComment/${postCommentId}`, {
        headers: {
            'Content-Type': 'application/json', // JSON 데이터 전송
        },
    });
};
