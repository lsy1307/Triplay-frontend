import React, { useState } from 'react';
import styled from 'styled-components';

import LeftContainer from '../../components/planTripPage/LeftContainer.jsx';
import RightContainer from '../../components/planTripPage/RightContainer.jsx';
import Header from '../../layout/Header.jsx';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-datepicker/dist/react-datepicker.css';
import { postTrip } from '../../api/tripDetail.js';

const Plan = () => {
  const [locationList, setLocationList] = useState([]);
  const [selectedPlanDay, setSelectedPlanDay] = useState(0);
  const [isReArrange, setIsReArrange] = useState(false);
  const [tripTitle, setTripTitle] = useState('');
  const [dateRange, setDateRange] = useState([null, null]);
  const [partyName, setPartyName] = useState('');

  const addToLocationList = (data) => {
    setLocationList([...locationList, data]);
  };

  const changeLocationList = (data) => {
    setLocationList(data);
  };

  const onClickCompleteBtnHandler = async () => {
    const data = {
      tripTitle,
      tripParty: partyName,
      tripStartDate: dateRange[0],
      tripEndDate: dateRange[1],
      places: locationList,
    };

    const res = await postTrip(data);
    console.log(res);
  };

  return (
    <div>
      <Header />
      <TotalContainer>
        <LeftSection>
          <LeftContainerWrapper>
            <LeftContainer
              selectedPlanDay={selectedPlanDay}
              locationList={locationList}
              isReArrange={isReArrange}
              setIsReArrange={setIsReArrange}
              setTripTitle={setTripTitle}
              tripTitle={tripTitle}
            />
          </LeftContainerWrapper>
        </LeftSection>
        <RightSection>
          <RightContainerWrapper>
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
            />
          </RightContainerWrapper>
        </RightSection>
      </TotalContainer>
    </div>
  );
};

export default Plan;

const TotalContainer = styled.div`
  width: 100%;
  height: 85vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f5f7fa;
  padding: 20px;
  box-sizing: border-box;
`;

const SectionContainer = styled.div`
  width: 45%;
  height: 100%;
  margin: 0 10px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  overflow-y: auto;
  background-color: #ffffff;
  padding: 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
`;

const LeftSection = styled(SectionContainer)`
  background-color: #ffffff;
`;

const RightSection = styled(SectionContainer)`
  background-color: #ffffff;
`;

const LeftContainerWrapper = styled.div`
  flex-grow: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const RightContainerWrapper = styled.div`
  flex-grow: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
`;
