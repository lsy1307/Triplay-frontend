import { GetAxiosInstance } from '../axios/AxiosMethod';

export const getTrips = async () => {
  const response = GetAxiosInstance('/trip/user', {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return (await response).data;
};

export const getPosts = async () => {
  return await GetAxiosInstance('/post/user', {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const getClips = async () => {
  return await GetAxiosInstance('/clip/user', {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
