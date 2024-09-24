import { Link, useNavigate } from 'react-router-dom';
import React from 'react';
import styled from 'styled-components';

const MobileHeader = () => {

  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <TotalContainer>
      <HeaderWrapper>
        <Logo>
          <Link to="/main">
            <img src="/src/assets/images/logo.png" alt="Logo" />
          </Link>
        </Logo>
        <Menu>
          <ul>
            <li>
              {localStorage.getItem("token") == null && <LoginButton onClick={handleLoginClick}>로그인</LoginButton>}
            </li>
          </ul>
        </Menu>
      </HeaderWrapper>
    </TotalContainer>
  );
}


export default MobileHeader;

const TotalContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  border-bottom: 0.1em black solid;
`;

const HeaderWrapper = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 1rem;
`;

const Logo = styled.div`
  img {
    height: 2.4rem;
  }
`;

const Menu = styled.nav`
  ul {
    list-style: none;
    display: flex;
    gap: 0.3em;
    margin: 0;
    padding: 0;
    align-items: center;
  }

  li {
    margin: 0;
    font-size: 1rem;
  }

  a {
    text-decoration: none;
    color: #343a40;
  }
`;

const LoginButton = styled.button`
  background-color: black;
  color: white;
  border: none;
  border-radius: 0.5rem;
  padding: 0.5rem 1rem;
  cursor: pointer;
  font-size: 1rem;

  &:hover {
    background-color: #0056b3;
  }
`;