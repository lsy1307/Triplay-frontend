import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const CallBack = () => {
  const { search } = useLocation();
  useEffect(() => {
    const params = new URLSearchParams(search);
    const code = params.get('code');
  }, [search]);
};

export default CallBack;
