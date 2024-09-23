import AddPlanMapContainer from '../../postMakePage/upperContainer/AddPlanMapMobileContainer.jsx';
import React, { useState } from 'react';
import styled, {keyframes} from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import TripPlaceContainer from './TripPlaceContainer.jsx';

const TripDayContainer = (props) => {
  const [isAddPlanMapOn, setIsAddPlanMapOn] = useState(false);

  const changeIsAddPlanMapOn = () => {
    setIsAddPlanMapOn(!isAddPlanMapOn)
  }

  const toggleDropdown = (data) => {
    props.setSelectedPlanDay(prevDay => prevDay === data ? 0 : data);
  };

  return <DayContainer isopen={`${props.selectedPlanDay === props.planDay}`}>
    <DayHeader onClick={() => toggleDropdown(props.planDay)}>
      <DayInfo>{props.planDay}일차</DayInfo>
      <ToggleIcon icon={faPlay} isopen={`${props.selectedPlanDay === props.planDay}`} />
    </DayHeader>
    <DayBody isopen={`${props.selectedPlanDay === props.planDay}`}>
      {
        props.locationList.filter(location => location.planDay === props.planDay)
          .map((location, index) => <TripPlaceContainer
            locationList={props.locationList}
            key={index}
            location={location}
            changeLocationList={props.changeLocationList}
          />)
      }
      <TripPlaceAddButton onClick={() => changeIsAddPlanMapOn()}>장소 추가하기</TripPlaceAddButton>
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
    </DayBody>
  </DayContainer>
}

export default TripDayContainer

const DayContainer = styled.div`
    padding: 0.5rem;
    border: 1px solid;
    display: flex;
    flex-direction: column;
    gap: ${({ isopen }) => (isopen === "true" ? '0.5rem' : '')};
`

const DayHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`

const DayInfo = styled.p`
    margin: 0;
`

const ToggleIcon = styled(FontAwesomeIcon)`
    transform: ${({ isopen }) => (isopen === "true" ? 'rotate(90deg)' : 'rotate(270deg)')};
    transition: transform 0.3s ease;
`;

const DayBody = styled.div`
    overflow: hidden;
    animation: ${({ isopen }) => (isopen === "true" ? slideDown : slideUp)} 0.3s forwards;
    max-height: ${({ isopen }) => (isopen === "true" ? "1000px" : "0")};
    opacity: ${({ isopen }) => (isopen === "true" ? 1 : 0)};
    transition: max-height 0.6s ease, opacity 0.6s ease;
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
`

const TripPlaceAddButton = styled.button`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid;
`

// 슬라이드 다운 애니메이션 정의
const slideDown = keyframes`
    0% {
        max-height: 0;
        opacity: 0;
    }
    100% {
        max-height: 500px; /* 매우 큰 값으로 설정 */
        opacity: 1;
    }
`;

// 슬라이드 업 애니메이션 정의
const slideUp = keyframes`
    0% {
        max-height: 500px; /* 매우 큰 값으로 설정 */
        opacity: 1;
    }
    100% {
        max-height: 0;
        opacity: 0;
    }
`;