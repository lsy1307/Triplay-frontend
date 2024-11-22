import { PostAxiosInstance, GetAxiosInstance, PutAxiosInstance, DeleteAxiosInstance } from '../axios/AxiosMethod';

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

export const updateTrip = async (updatedTrip) => {
  try {
    const response = await PutAxiosInstance(`/api/trip/${updatedTrip.tripId}`, updatedTrip);
    return response.data;
  } catch (error) {
    console.error('Error updating trip:', error);
    throw error;
  }
};

export const deleteTrip = async (tripId) => {
  const response = await DeleteAxiosInstance(`/api/trips/${tripId}`);
  if (!response.ok) {
    throw new Error('Failed to delete trip');
  }
};
