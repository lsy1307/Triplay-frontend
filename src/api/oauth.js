import { PostAxiosInstance } from '../axios/AxiosMethod';
import axios from 'axios';

export const getToken = async (code, state) => {
  const baseURL = import.meta.env.VITE_BASE_URL;

  const res = await axios.post(`${baseURL}/oauth2/callback`, {
    code: code,
    state: state,
  });

  return res;
};
