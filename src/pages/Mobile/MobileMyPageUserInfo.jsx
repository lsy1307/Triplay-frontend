import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { deleteUser, getUserData } from '../../api/oauth';
import { useNavigate } from 'react-router-dom';
const MobileMyPageUserInfo = () => {
  const [userData, setUserData] = useState();
  const navigate = useNavigate();
  const handleDeleteUser = async () => {
    const res = await deleteUser();
    if (res) {
      localStorage.clear();
      navigate('/trip');
    }
  };
  useEffect(() => {
    const getData = async () => {
      const res = await getUserData();
      console.log(res);
      setUserData(res.data);
    };
    getData();
  }, []);
  return (
    <Container>
      <div className="content">
        <div className="profile">
          <img src={userData.profileUrl} alt="이미지 로드 중" />
          <p className="nickname">{userData.userName}</p>
          <p className="email">{userData.email}</p>
        </div>
        <div className="line" />
        <div className="info-container">
          <div className="title">개인 정보</div>
          <div className="info">
            <p className="key">이메일</p>
            <p className="value">{userData.email}</p>
          </div>
          <div className="info">
            <p className="key">닉네임</p>
            <p className="value">{userData.userName}</p>
          </div>
        </div>
        <div className="button-container">
          <button className="modify">수정하기</button>
        </div>
        <div className="line" />
        <button className="delete" onClick={handleDeleteUser}>
          <p className="button-text">회원 탈퇴</p>
          <p className="button-text">&gt;</p>
        </button>
      </div>
    </Container>
  );
};

export default MobileMyPageUserInfo;

const Container = styled.section`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  div {
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
    background-color: #393939;
    &.content {
      height: 100%;
      flex-direction: column;
      gap: 3rem;
    }
    &.profile {
      flex-direction: column;
      gap: 0.1rem;
    }
    &.line {
      height: 1.25rem;
      background-color: #a8a8a8;
    }
    &.info-container {
      flex-direction: column;
      gap: 1rem;
    }
    &.title {
      width: 95%;
      height: 3rem;
      justify-content: flex-start;
      color: #c0d0ff;
      text-align: center;
      font-family: Inter;
      font-size: 1.25rem;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      border-bottom: 1px solid #fff;
    }
    &.info {
      gap: 0.5rem;
      justify-content: flex-start;
    }
    &.button-container {
      justify-content: flex-end;
      padding-right: 0.5rem;
    }
  }
  p {
    color: #fff;
    text-align: left;
    font-family: Inter;
    font-size: 1.25rem;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    padding: 0.8rem;
    margin: 0;
    width: 100%;
    &.key {
      width: 40%;
    }
    &.value {
      width: 60%;
    }
    &.button-text {
      width: auto;
      text-align: center;
      font-size: 1rem;
      font-style: normal;
    }
    &.nickname {
      text-align: center;
      font-size: 1rem;
      font-style: normal;
      padding: 0.1rem;
    }
    &.email {
      text-align: center;
      font-size: 0.75rem;
      opacity: 0.76;
      padding: 0.1rem;
    }
  }
  button {
    &.modify {
      width: 3.125rem;
      height: 1.0625rem;
      gap: 0.625rem;
      color: #000;
      text-align: center;
      font-family: Inter;
      font-size: 0.625rem;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      border-radius: 0.3125rem;
      background-color: #c6c6c6;
    }
    &.delete {
      display: flex;
      width: 80%;
      height: 3.625rem;
      padding: 0.1rem 0.5rem;
      justify-content: space-between;
      align-items: center;
      border-radius: 0.9375rem;
      background-color: #ffd6d6;
      color: #fff;
      text-align: center;
      font-family: Inter;
      font-size: 1rem;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
    }
  }
  img {
    width: 3.875rem;
    height: 3.875rem;
    border-radius: 3.9375rem;
  }
`;
