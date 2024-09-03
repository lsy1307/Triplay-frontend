import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { ReactComponent as NaverLogin } from '../../assets/svgs/naver_login_icon.svg';

const Login = () => {
  const [state, setState] = useState();
  const generateState = () => {
    return Math.random().toString(36).substring(2, 15);
  };
  const handleLoginRedirect = () => {
    const url = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${import.meta.env.VITE_CLIENT_ID}&redirect_uri=${encodeURIComponent(import.meta.env.VITE_REDIRECT_URI)}&state=${state}`;
    window.location.href = url;
  };

  useEffect(() => {
    setState(generateState());
  }, []);
  return (
    <Container>
      <ContentContainer>
        Triplay와 함께 떠나기
        <LoginButton onClick={handleLoginRedirect}>
          <NaverLogin />
        </LoginButton>
      </ContentContainer>
    </Container>
  );
};

export default Login;

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #393939;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 7.5625rem;
  color: #fff;
  text-align: center;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  font-family: Pretendard;
  font-size: 6.25rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const LoginButton = styled.button`
  background-color: transparent;
  border: none;
`;
