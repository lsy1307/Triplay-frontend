import React from 'react';
import styled from 'styled-components';

import CalendarInputWrapper from './rightContainer/CalendarInputWrapper';
import RegistPartyContentsContainer from './rightContainer/RegistPartyContentsContainer';
import AddPlanContainer from './rightContainer/AddPlanContainer';

const RightContainer = (props) => {
  return (
    <Container>
      <ContentsContainer>
        <CalendarInputWrapper></CalendarInputWrapper>
        <RegistPartyContentsContainer></RegistPartyContentsContainer>
        <AddPlanContainer
          getLocationDataFromLocationName={
            props.getLocationDataFromLocationName
          }
          getPlaceDataFromLocationName={props.getPlaceDataFromLocationName}
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
`;
