import { PostAxiosInstance } from '../axios/AxiosMethod';

export const getToken = async (code, state) => {
  const res = await PostAxiosInstance(`/login`, {
    body: {
      code: code,
      state: state,
    },
  });
  return res;
};
