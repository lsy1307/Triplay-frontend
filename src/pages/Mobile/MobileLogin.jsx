import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { ReactComponent as NaverLoginIcon } from '../../assets/svgs/naver_login_icon.svg';
import { handleLoginRedirect, generateState } from '../../api/oauth';

const MobileLogin = () => {
  const [state, setState] = useState();

  useEffect(() => {
    setState(generateState());
  }, []);
  return (
    <Container>
      <LoginContainer>
        <LogoText>TRIPLAY</LogoText>
        <LoginText>SNS 간편 로그인</LoginText>
        <LoginLine />
        <button onClick={() => handleLoginRedirect(state)}>
          <StyledLoginIcon />
        </button>
      </LoginContainer>
    </Container>
  );
};

export default MobileLogin;

const Container = styled.div`
  display: flex;
  padding: 13.8125rem 3.125rem;
  justify-content: center;
  align-items: center;
  gap: 0.625rem;
  background-color: #393939;
`;

const LoginContainer = styled.div`
  display: flex;
  padding: 2.5rem 2.0625rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1.75rem;
  background-color: #ffffff;
  border-radius: 0.625rem;
  border: 1px #393939;
`;

const LogoText = styled.div`
  display: flex;
  width: 7.5rem;
  height: 1.875rem;
  justify-content: center;
  align-items: center;
  color: #000;

  text-align: center;
  font-family: 'Luckiest Guy';
  font-size: 1.875rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const LoginText = styled.div`
  display: flex;
  height: 1rem;
  justify-content: center;
  align-items: center;
  align-self: stretch;
`;

const LoginLine = styled.hr`
  height: 0.1rem;
  width: 80%;
  background-color: black;
`;

const StyledLoginIcon = styled(NaverLoginIcon)`
  height: 2.5625rem;
  align-self: stretch;
`;
