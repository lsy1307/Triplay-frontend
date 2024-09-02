import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getToken } from '../api/oauth';
import { useSelector } from 'react-redux';

const CallBack = () => {
  const { search } = useLocation();
  const navigate = useNavigate();
  const isMobile = useSelector((state) => state.auth.isMobile);
  useEffect(() => {
    const params = new URLSearchParams(search);
    const code = params.get('code');
    const state = params.get('state');
    if (code) {
      fetchToken(code, state);
    }
  }, [search]);

  const fetchToken = async (code, state) => {
    const res = await getToken(code, state);
    try {
      console.log(res);
      localStorage.setItem('token', res.data.token);
    } catch (error) {
      console.log(error);
    }
    if (!isMobile) navigate('/main');
    else navigate('/trip');
  };
};

export default CallBack;
