import { GetAxiosInstance, PostAxiosInstance } from '../axios/AxiosMethod';

export const getPreferences = async () => {
  return await GetAxiosInstance(`/preference`, {
    headers: {
      'Content-Type': 'application/json', // Change to application/json
    },
  });
};

export const registerUserPreferences = async (preferenceIds) => {
  return await PostAxiosInstance(
    '/preference',
     preferenceIds ,
    {
      headers: {
        'Content-Type': 'application/json', // Change to application/json
      },
    }
  );
};
