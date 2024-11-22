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
  const response = GetAxiosInstance('/post/user', {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return (await response).data
};

export const getClips = async () => {
  const response = GetAxiosInstance('/clip/user', {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return (await response).data
};
