import { PostAxiosInstance } from '../axios/AxiosMethod';
import axios from 'axios';

const baseURL = import.meta.env.VITE_BASE_URL;
export const getToken = async (code, state) => {
  try {
    const res = await axios.post(`${baseURL}/oauth2/callback`, {
      code: code,
      state: state,
    });
    return res;
  } catch (e) {
    console.error(e);
  }
};

export const generateState = () => {
  return Math.random().toString(36).substring(2, 15);
};

export const handleLoginRedirect = (state) => {
  const url = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${import.meta.env.VITE_CLIENT_ID}&redirect_uri=${encodeURIComponent(import.meta.env.VITE_REDIRECT_URI)}&state=${state}`;
  window.location.href = url;
};

export const getRefresh = async (refresh) => {
  try {
    const res = await axios.get(`${baseURL}/refresh`, {
      headers: {
        Authorization: `Bearer ${refresh}`,
      },
    });
    return res;
  } catch (e) {
    console.error(e);
  }
};
