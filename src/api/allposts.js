import axios from 'axios';

const baseURL = import.meta.env.VITE_BASE_URL;
export const fetchPosts = async () => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${baseURL}/post`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching posts:", error);
        throw error;
    }
};