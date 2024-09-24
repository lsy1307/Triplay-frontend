import axios from 'axios';

const baseURL = import.meta.env.VITE_BASE_URL;
export const fetchFileDetails = async (postId) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${baseURL}/file/image/${postId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching file details:", error);
        throw error;
    }
};
