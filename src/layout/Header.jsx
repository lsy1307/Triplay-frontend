import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { fetchUserDetail } from '../api/userDetail';

const Header = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const getUserData = async () => {
      try {
        const data = await fetchUserDetail();
        setUserInfo(data);
      } catch (error) {
        console.error('Failed to fetch user info:', error);
      }
    };

    getUserData();
  }, []);

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleLogoutClick = () => {
    localStorage.removeItem('token'); // 로그아웃 시 토큰 삭제
    setUserInfo(null); // 사용자 정보 초기화
    navigate('/login');
  };

  const handleModifyClick = () => {
    navigate('/mypage/modify'); // "내 정보 수정" 클릭 시 이동
  };

  return (
    <TotalContainer>
      <HeaderWrapper>
        <Logo>
          <Link to="/main">
            <img src="../src/assets/images/logo.png" alt="Logo" />
          </Link>
        </Logo>

        <MenuAndProfile>
          <Menu>
            <ul>
              <li>
                <Link to="/plan">준비하기</Link>
              </li>
              <li>
                <Link to="/post">둘러보기</Link>
              </li>
              <li>
                <Link to="/post">지난여행</Link>
              </li>
              <li>
                {userInfo ? (
                  <>
                    <LoginButton onClick={handleLogoutClick}>로그아웃</LoginButton>
                  </>
                ) : (
                  <LoginButton onClick={handleLoginClick}>로그인</LoginButton>
                )}
              </li>
            </ul>
          </Menu>
          {userInfo && ( // userInfo가 있을 때만 ProfileContainer를 렌더링
            <ProfileContainer>
              <img src={userInfo.profilePicUrl} alt="Profile" />
              <span>{userInfo.userName}</span>
              <ModifyButton onClick={handleModifyClick}>내 정보 수정</ModifyButton>
            </ProfileContainer>
          )}
        </MenuAndProfile>
      </HeaderWrapper>
    </TotalContainer>
  );
};

export default Header;

const TotalContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  border-bottom: 1px black solid;
`;

const HeaderWrapper = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30px 60px;
`;

const Logo = styled.div`
  img {
    height: 75px;
  }
`;

const MenuAndProfile = styled.div`
  display: flex;
  flex-direction: column; /* 세로로 배치 */
  align-items: flex-end; /* 오른쪽 정렬 */
  gap: 10px;
`;

const Menu = styled.nav`
  ul {
    list-style: none;
    display: flex;
    gap: 35px;
    margin: 0;
    padding: 0;
    align-items: center;
  }

  li {
    margin: 0;
    font-size: 30px;
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
  margin-top: 10px;
  border: solid 0.5px gray;
  padding: 6px 10px;

  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }

  span {
    font-size: 20px;
  }
`;

const ModifyButton = styled.button`
  background-color: transparent;
  border: 0.3px solid;
  font-size: 16px;
  padding: 5px;
`;

const LoginButton = styled.button`
  background-color: black;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 7.5px 20px;
  cursor: pointer;
  font-size: 28px;

  &:hover {
    background-color: #0056b3;
  }
`;
