import { GetAxiosInstance, PostAxiosInstance } from '../axios/AxiosMethod';

export const getPreferences = async () => {
  return await GetAxiosInstance(`/preference`);
};

export const registerUserPreferences = async (preferenceIds) => {
  return await PostAxiosInstance('/preference', { preferenceIds });
};
