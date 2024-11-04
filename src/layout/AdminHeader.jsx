import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import HeaderLogo from '../assets/svgs/header_logo.svg';

const AdminHeader = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const isAdminLoggedIn = localStorage.getItem('isAdminLoggedIn') === 'true';
    setIsLoggedIn(!!token && isAdminLoggedIn);
  }, []);

  const handleLogoClick = useCallback(() => {
    if (isLoggedIn) {
      navigate('/admin/home');
    } else {
      navigate('/admin/login');
    }
  }, [navigate, isLoggedIn]);

  const handleLoginClick = useCallback(() => {
    if (isLoggedIn) {
      localStorage.removeItem('token');
      localStorage.removeItem('refresh');
      localStorage.removeItem('isAdminLoggedIn');
      setIsLoggedIn(false);
      navigate('/admin/login');
    } else {
      navigate('/admin/login');
    }
  }, [navigate, isLoggedIn]);

  return (
    <Header>
      <LogoWrapper onClick={handleLogoClick}>
        <Logo src={HeaderLogo} alt='Header Logo' />
      </LogoWrapper>
      <LoginButton onClick={handleLoginClick}>
        {isLoggedIn ? 'LOGOUT' : 'LOGIN'}
      </LoginButton>
    </Header>
  );
};

export default AdminHeader;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 4rem;
  background-color: #b8e986;

  @media (max-width: 768px) {
    padding: 0.8rem 2rem;
  }
`;

const LogoWrapper = styled.div`
  width: 30%; // 로고의 최대 너비를 제한
  max-width: 250px; // 로고의 최대 크기 설정
  min-width: 100px; // 로고의 최소 크기 설정
  cursor: pointer;
`;

const Logo = styled.img`
  width: 100%;
  height: auto;
  object-fit: contain;
`;

const LoginButton = styled.button`
  background-color: #000000;
  color: #ffffff;
  width: 90px;
  height: 40px;
  border: none;
  border-radius: 5px;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  font-family: 'KoreanJJPPB', sans-serif;
  cursor: pointer;
`;
