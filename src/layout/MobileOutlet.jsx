import React from 'react';
import { Outlet } from 'react-router-dom';
import MobileHeader from './MobileHeader';
import styled from 'styled-components';

const MobileOutlet = () => {
  return (
    <>
      <Content>
        <MobileHeader />
        <Content>
          <Outlet />
        </Content>
      </Content>
    </>
  );
};

export default MobileOutlet;

const Content = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
`;
