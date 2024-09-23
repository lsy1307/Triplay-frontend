import axios from 'axios';

const baseURL = import.meta.env.VITE_BASE_URL;

export const fetchUserDetail = async (userId) => {
    try {
        const token = localStorage.getItem('token');

        const userResponse = await axios.get(`${baseURL}/user/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        const profileImageResponse = await axios.get(`${baseURL}/file/image/profile/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        const profilePicUrl = profileImageResponse.data || '/default-profile-image.jpg';

        return {
            ...userResponse.data,
            profilePicUrl,
        };

    } catch (error) {
        console.error("Error fetching user details:", error);
        throw error;
    }
};
