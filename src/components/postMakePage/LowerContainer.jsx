import styled from 'styled-components';
import TripDayContainer from './lowerContainer/TripDayContainer.jsx';
import React, { useState } from 'react';

const LowerContainer = (props) => {
  const [PlanDropDownBoxes, setPlanDropDownBoxes] = useState([]);

  return <TotalContainer>
    <TripDayContainer
      planDay={1}
      selectedPlanDay={props.selectedPlanDay}
      getLocationDataFromLocationName={props.getLocationDataFromLocationName}
      getPlaceDataFromLocationName={props.getPlaceDataFromLocationName}
      locationList={props.locationList}
      addToLocationList={props.addToLocationList}
    />
    <TripDayAddButton>일정 추가하기</TripDayAddButton>
  </TotalContainer>
}

export default LowerContainer

const TotalContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 0.5rem;
`

const TripDayAddButton = styled.button`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`