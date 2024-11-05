import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import CalendarInputWrapper from './rightContainer/CalendarInputWrapper';
import RegistPartyContentsContainer from './rightContainer/RegistPartyContentsContainer';
import AddPlanContainer from './rightContainer/AddPlanContainer';

const RightContainer = (props) => {
  return (
    <Container>
      <ContentsContainer>
        <CalenderAndCompleteBtnWrapper>
          <CalendarInputWrapper setDateRange={props.setDateRange} dateRange={props.dateRange} />
          <CompleteButtonWrapper>
            <CompleteButton onClick={props.onClickCompleteBtnHandler}>완료하기</CompleteButton>
          </CompleteButtonWrapper>
        </CalenderAndCompleteBtnWrapper>
        <RegistPartyContentsContainer setPartyName={props.setPartyName} />
        <AddPlanContainer
          addToLocationList={props.addToLocationList}
          locationList={props.locationList}
          changeLocationList={props.changeLocationList}
          setSelectedPlanDay={props.setSelectedPlanDay}
          selectedPlanDay={props.selectedPlanDay}
          setIsReArrange={props.setIsReArrange}
        />
      </ContentsContainer>
    </Container>
  );
};

export default RightContainer;

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: left;
`;

const ContentsContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  box-sizing: border-box;
`;

const CalenderAndCompleteBtnWrapper = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const CompleteButtonWrapper = styled.div`
  display: flex;
`;

const CompleteButton = styled.button`
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  padding: 10px 20px;
  color: white;
  background-color: #000000;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #388e3c;
  }

  &:active {
    background-color: #dddddd;
  }
`;
