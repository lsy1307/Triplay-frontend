import React from 'react';
import styled from 'styled-components';

import CalendarInputWrapper from './rightContainer/CalendarInputWrapper';
import RegistPartyContentsContainer from './rightContainer/RegistPartyContentsContainer';
import AddPlanContainer from './rightContainer/AddPlanContainer';

const RightContainer = (props) => {
  return (
    <Container>
      <ContentsContainer>
        <CalenderAndCompleteBtnWrapper>
          <CalendarInputWrapper setDateRange={props.setDateRange} dateRange={props.dateRange}></CalendarInputWrapper>
          <CompleteButtonWrapper><CompleteButton onClick={props.onClickCompleteBtnHandler}>완료하기</CompleteButton></CompleteButtonWrapper>
        </CalenderAndCompleteBtnWrapper>
        <RegistPartyContentsContainer setPartyName={props.setPartyName}></RegistPartyContentsContainer>
        <AddPlanContainer
          addToLocationList={props.addToLocationList}
          locationList={props.locationList}
          changeLocationList={props.changeLocationList}
          setSelectedPlanDay={props.setSelectedPlanDay}
          selectedPlanDay={props.selectedPlanDay}
          setIsReArrange={props.setIsReArrange}
        ></AddPlanContainer>
      </ContentsContainer>
    </Container>
  );
};

export default RightContainer;

const Container = styled.div`
  width: 50%;
  height: 80%;
  border-bottom: 1px solid black;
  display: flex;
  align-items: center;
  justify-content: left;
`;

const ContentsContainer = styled.div`
  width: 90%;
  height: 95%;
  display: flex;
  flex-direction: column;
  align-items:center;
`;

const CalenderAndCompleteBtnWrapper = styled.div`
  display:flex;
  width: 100%;
  align-items:center;
`

const CompleteButtonWrapper = styled.div`
  width: auto;
  display: flex;
`;

const CompleteButton = styled.button`
  border: 1px solid black;
  border-radius: 1rem;
  font-size: 1.5rem;
  padding:0.6rem;
`;
