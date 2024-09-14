import AddPlanMapContainer from '../../planTripPage/rightContainer/AddPlanMapContainer.jsx';
import React, { useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';

const TripDayContainer = (props) => {
  const [isAddPlanMapOn, setIsAddPlanMapOn] = useState(false);

  const changeIsAddPlanMapOn = () => {
    setIsAddPlanMapOn(!isAddPlanMapOn)
  }

  const toggleDropdown = (data) => {
    props.setSelectedPlanDay(prevDay => prevDay === data ? 0 : data);
  };

  return <DayContainer>
    <DayHeader onClick={() => toggleDropdown(props.planDay)}>
      <DayInfo>1일차</DayInfo>
      <ToggleIcon icon={faPlay} isopen={`${props.selectedPlanDay === props.planDay}`} />
    </DayHeader>
    {
      isAddPlanMapOn && (
        <AddPlanMapContainer
          planDay={props.selectedPlanDay}
          getLocationDataFromLocationName={props.getLocationDataFromLocationName}
          getPlaceDataFromLocationName={props.getPlaceDataFromLocationName}
          setIsAddPlanMapOn={setIsAddPlanMapOn}
          locationList={props.locationList}
          addToLocationList={props.addToLocationList}
        />
      )
    }
    <TripPlaceAddButton onClick={() => changeIsAddPlanMapOn()}>장소 추가하기</TripPlaceAddButton>
  </DayContainer>
}

export default TripDayContainer

const DayContainer = styled.div`
    border: 1px solid;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
`

const DayHeader = styled.div`
    display: flex;
    justify-content: space-between;
`

const DayInfo = styled.p`

`

const ToggleIcon = styled(FontAwesomeIcon)`
    transform: ${({ isopen }) => (isopen === "true" ? 'rotate(90deg)' : 'rotate(270deg)')};
    transition: transform 0.3s ease;
`;

const TripPlaceAddButton = styled.button`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`