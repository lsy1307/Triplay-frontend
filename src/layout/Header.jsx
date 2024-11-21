import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { fetchUserDetail } from '../api/user';
import MainLogo from '../../src/assets/images/logo.png';

const Header = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(() => {
    // Load userInfo from local storage if available
    const storedUserInfo = localStorage.getItem('userInfo');
    return storedUserInfo ? JSON.parse(storedUserInfo) : null;
  });

  useEffect(() => {
    const getUserData = async () => {
      if (!userInfo) {
        // Fetch only if userInfo is not already cached
        try {
          const data = await fetchUserDetail();
          setUserInfo(data);
          localStorage.setItem('userInfo', JSON.stringify(data)); // Cache userInfo in local storage
        } catch (error) {
          console.error('Failed to fetch user info:', error);
        }
      }
    };

    getUserData();
  }, [userInfo]);

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleLogoutClick = () => {
    localStorage.removeItem('token'); // Remove token on logout
    localStorage.removeItem('userInfo'); // Clear cached userInfo
    setUserInfo(null); // Reset userInfo state
    navigate('/login');
  };

  const handleModifyClick = () => {
    navigate('/mypage/modify'); // Navigate to user info modification page
  };

  return (
    <TotalContainer>
      <HeaderWrapper>
        <Logo>
          <Link to="/main">
            <img src={MainLogo} alt="Logo" />
          </Link>
        </Logo>
        <MenuAndProfile>
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
                {userInfo ? (
                  <>
                    <LoginButton onClick={handleLogoutClick}>
                      로그아웃
                    </LoginButton>
                  </>
                ) : (
                  <LoginButton onClick={handleLoginClick}>로그인</LoginButton>
                )}
              </li>
            </ul>
          </Menu>
        </MenuAndProfile>
      </HeaderWrapper>
      {userInfo && (
        <ProfileContainer>
          <img src={userInfo.profileUrl} alt="Profile" />
          <span>{userInfo.userName}</span>
          <ModifyButton onClick={handleModifyClick}>내 정보 수정</ModifyButton>
        </ProfileContainer>
      )}
    </TotalContainer>
  );
};

export default Header;

const TotalContainer = styled.div`
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

const MenuAndProfile = styled.div`
  display: flex;
  flex-direction: column; /* 세로로 배치 */
  align-items: flex-end; /* 오른쪽 정렬 */
  gap: 10px;
`;
