import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Header = () => {
    const navigate = useNavigate();

    const handleLoginClick = () => {
        navigate('/login');
    };

    return (
        <TotalContainer>
            <HeaderWrapper>
                <Logo>
                    <Link to="/main">
                        <img src="../src/assets/images/logo.png" alt="Logo" />
                    </Link>
                </Logo>

                <Menu>
                    <ul>
                        <li><Link to="/plan">준비하기</Link></li>
                        <li><Link to="/post">둘러보기</Link></li>
                        <li><Link to="/post">지난여행</Link></li>
                        <li>
                            <LoginButton onClick={handleLoginClick}>
                                로그인
                            </LoginButton>
                        </li>
                    </ul>
                </Menu>
            </HeaderWrapper>
        </TotalContainer>
    );
}

export default Header;

const TotalContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
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

  a:hover {
    color: #007bff;
  }
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
