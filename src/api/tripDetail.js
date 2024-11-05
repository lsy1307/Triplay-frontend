import { PostAxiosInstance, GetAxiosInstance } from '../axios/AxiosMethod';

export const fetchTripDetails = async (tripId) => {
  try {
    const response = await GetAxiosInstance(`/trip/${tripId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching trip details:', error);
    throw error;
  }
};

export const postTrip = async (data) => {
  try {
    const response = await PostAxiosInstance(`/trip`, data);
    return response.data;
  } catch (error) {
    console.error('Error post trip:', error);
    throw error;
  }
};
