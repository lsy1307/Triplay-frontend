import { GetAxiosInstance } from '../axios/AxiosMethod';

export const getTrips = async () => {
  return await GetAxiosInstance('/trip/user');
};

export const getPosts = async () => {
  return await GetAxiosInstance('/post/user');
};

export const getClips = async () => {
  return await GetAxiosInstance('/clip/user');
};
