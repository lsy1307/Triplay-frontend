import React from 'react';
import UserInfoSection from '../../components/mypageModify/UserInfoSection';
import PreferencesSection from '../../components/mypageModify/PreferencesSection';
import styled from 'styled-components';
import Header from '../../layout/Header';

const MyPageModify = () => {
  return (
    <div>
    <Header/>
      <Container>
        <UserInfoSection />
        <PreferencesSection />
      </Container>
    </div>
  );
};

export default MyPageModify;

const Container = styled.div`
  display: flex;
  justify-content: center;
  padding: 50px;
  background-color: #f9f9f9;
  width: 80%;
  margin: auto;
`;
