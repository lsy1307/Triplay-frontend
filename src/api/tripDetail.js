import { GetAxiosInstance } from '../axios/AxiosMethod';

export const fetchTripDetails = async (tripId) => {
  try {
    const response = await GetAxiosInstance(`/trip/${tripId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching trip details:', error);
    throw error;
  }
};
