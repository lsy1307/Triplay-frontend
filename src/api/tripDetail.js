import axios from 'axios';

const baseURL = import.meta.env.VITE_BASE_URL;
export const fetchTripDetails = async (tripId) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${baseURL}/trip/${tripId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching trip details:", error);
        throw error;
    }
};
