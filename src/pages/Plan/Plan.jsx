import React, { useState, useEffect } from 'react';
import styled from 'styled-components';


import LeftContainer from '../../components/planTripPage/LeftContainer.jsx';
import RightContainer from '../../components/planTripPage/RightContainer.jsx';
import Header from '../../layout/Header.jsx';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-datepicker/dist/react-datepicker.css';

const TotalContainer = styled.div`
  width: 100%;
  height: 85vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Plan = () => {
  const [locationList, setLocationList] = useState([]);

  const [selectedPlanDay, setSelectedPlanDay] = useState(0);

  const [isReArrange, setIsReArrange] = useState(false);

  // 여행 제목 입력값
  const [tripTitle, setTripTitle] = useState('');

  // 달력 날짜 입력값
  const [dateRange, setDateRange] = useState([null, null]);

  // 일행
  const [partyName, setPartyName] = useState("");

  const addToLocationList = (data) => {
    setLocationList([...locationList, data]);
  };

  const changeLocationList = (data) => {
    setLocationList(data);
  };

  const onClickCompleteBtnHandler = () => {
    const data = {
      tripTitle: tripTitle,
      tripParty: partyName,
      tripStartDate: dateRange[0],
      tripEndDate: dateRange[1],
      places: locationList
    }

    console.log(data);
  }

  return (
    <div>
      <Header />
      <TotalContainer>
        <LeftContainer
          selectedPlanDay={selectedPlanDay}
          locationList={locationList}
          isReArrange={isReArrange}
          setIsReArrange={setIsReArrange}
          setTripTitle={setTripTitle}
          tripTitle={tripTitle}
        ></LeftContainer>
        <RightContainer
          addToLocationList={addToLocationList}
          changeLocationList={changeLocationList}
          locationList={locationList}
          setSelectedPlanDay={setSelectedPlanDay}
          selectedPlanDay={selectedPlanDay}
          setIsReArrange={setIsReArrange}
          onClickCompleteBtnHandler={onClickCompleteBtnHandler}
          setDateRange={setDateRange}
          dateRange={dateRange}
          setPartyName={setPartyName}
        ></RightContainer>
      </TotalContainer>
    </div>
  );
};

export default Plan;
