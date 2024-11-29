import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { fetchUserDetail } from '../api/user';
import MainLogo from '../../src/assets/images/logo.png';
import { jwtDecode } from 'jwt-decode';

const Header = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(() => {
    const storedUserInfo = localStorage.getItem('userInfo');
    return storedUserInfo ? JSON.parse(storedUserInfo) : null;
  });

  const [isTokenValid, setIsTokenValid] = useState(false);

  useEffect(() => {
    const checkTokenValidity = () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const decodedToken = jwtDecode(token);
          const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
          setIsTokenValid(decodedToken.exp > currentTime); // Check if token is still valid
        } catch (error) {
          console.error('Invalid token:', error);
          setIsTokenValid(false); // Token is invalid or corrupted
        }
      } else {
        setIsTokenValid(false); // No token
      }
    };

    checkTokenValidity();
  }, []);

  useEffect(() => {
    const getUserData = async () => {
      if (isTokenValid && !userInfo) {
        try {
          const data = await fetchUserDetail();
          setUserInfo(data);
          localStorage.setItem('userInfo', JSON.stringify(data));
        } catch (error) {
          console.error('Failed to fetch user info:', error);
        }
      }
    };

    getUserData();
  }, [isTokenValid, userInfo]);

  const handleLoginClick = () => navigate('/login');
  const handleLogoutClick = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userInfo');
    setUserInfo(null);
    setIsTokenValid(false);
    navigate('/login');
  };
  const handleModifyClick = () => navigate('/mypage/modify');

  return (
    <HeaderContainer>
      <HeaderWrapper>
        <Logo>
          <Link to="/main">
            <img src={MainLogo} alt="Logo" />
          </Link>
        </Logo>
        <Menu>
          <ul>
            <li>
              <Link to="/plan">준비하기</Link>
            </li>
            <li>
              <Link to="/post">포스트 둘러보기</Link>
            </li>
            <li>
              <Link to="/clip">클립 둘러보기</Link>
            </li>
            <li>
              <Link to="/mypage">지난여행</Link>
            </li>
            <li>
              {isTokenValid ? (
                <LoginButton onClick={handleLogoutClick}>로그아웃</LoginButton>
              ) : (
                <LoginButton onClick={handleLoginClick}>로그인</LoginButton>
              )}
            </li>
          </ul>
        </Menu>
      </HeaderWrapper>
      {isTokenValid && userInfo && (
        <ProfileContainer>
          <img src={userInfo.profileUrl} alt="Profile" />
          <span>{userInfo.userName}</span>
          <ModifyButton onClick={handleModifyClick}>내 정보 수정</ModifyButton>
        </ProfileContainer>
      )}
    </HeaderContainer>
  );
};

export default Header;

// Styled Components
const HeaderContainer = styled.div`
  @font-face {
    font-family: 'S-CoreDream-3Light';
    src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_six@1.2/S-CoreDream-3Light.woff') format('woff');
    font-weight: normal;
    font-style: normal;
  }

  font-family: 'S-CoreDream-3Light', Arial, sans-serif;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-bottom: 1px solid black;
`;

const HeaderWrapper = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 20px 50px;
`;

const Logo = styled.div`
  img {
    height: 50px;
  }
`;

const Menu = styled.nav`
  ul {
    list-style: none;
    display: flex;
    gap: 30px;
    margin: 0;
    padding: 0;
    align-items: center;
  }

  li {
    margin: 0;
    font-size: 24px;
  }

  a {
    text-decoration: none;
    color: #343a40;
  }
`;

const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin: auto 48px 20px auto;
  border: solid 0.5px gray;
  padding: 6px 10px;
  background-color: #f0f0f0;
  border-radius: 5px;

  img {
    width: 35px;
    height: 35px;
    border-radius: 50%;
  }

  span {
    font-size: 18px;
  }
`;

const ModifyButton = styled.button`
  background-color: transparent;
  border: 0.3px solid;
  font-size: 14px;
  padding: 4px;
`;

const LoginButton = styled.button`
  background-color: black;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 6px 15px;
  cursor: pointer;
  font-size: 24px;

  &:hover {
    background-color: #0056b3;
  }
`;
