import React, { useState } from 'react';
import styled from 'styled-components';

import CalendarInputWrapper from './rightContainer/CalendarInputWrapper';
import RegistPartyContentsContainer from './rightContainer/RegistPartyContentsContainer';
import AddPlanContainer from './rightContainer/AddPlanContainer';

const RightContainer = ({
  dateRange,
  setDateRange,
  partyName,
  setPartyName,
  locationList,
  addToLocationList,
  changeLocationList,
  onSave,
  setIsReArrange,
}) => {
  // 일정 선택 상태 관리
  const [selectedPlanDay, setSelectedPlanDay] = useState(0);

  return (
    <Container>
      <ContentsContainer>
        {/* 캘린더와 완료 버튼 */}
        <CalenderAndCompleteBtnWrapper>
          <CalendarInputWrapper setDateRange={setDateRange} dateRange={dateRange} />
          <CompleteButtonWrapper>
            <CompleteButton onClick={onSave}>완료하기</CompleteButton>
          </CompleteButtonWrapper>
        </CalenderAndCompleteBtnWrapper>

        {/* 일행 등록 */}
        <RegistPartyContentsContainer partyName={partyName} setPartyName={setPartyName} />

        {/* 일정 관리 */}
        <AddPlanContainer
          addToLocationList={addToLocationList}
          locationList={locationList}
          changeLocationList={changeLocationList}
          setSelectedPlanDay={setSelectedPlanDay}
          selectedPlanDay={selectedPlanDay}
          setIsReArrange={setIsReArrange}
        />
      </ContentsContainer>
    </Container>
  );
};

export default RightContainer;

// Styled Components
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
