import React, {useState, useEffect} from "react";
import styled from "styled-components";

import axios from "axios";
import {getLocationDataFromLocationName, getPlaceDataFromLocationName} from "../axios/AxiosMethod.js";

import LeftContainer from "../components/planTripPage/LeftContainer.jsx";
import RightContainer from "../components/planTripPage/RightContainer.jsx";

import "bootstrap/dist/css/bootstrap.min.css";
import "react-datepicker/dist/react-datepicker.css";

const TotalContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const PlanTripPage = () => {

  const [locationList, setLocationList] = useState([]);

  const [selectedPlanDay, setSelectedPlanDay] = useState(0);

  const [isReArrange, setIsReArrange] = useState(false);

  return (
    <div>
      {/* Header */}
      <TotalContainer>
        <LeftContainer 
          getLocationDataFromLocationName={getLocationDataFromLocationName} 
          selectedPlanDay={selectedPlanDay}
          locationList={locationList}
          isReArrange={isReArrange}
          setIsReArrange={setIsReArrange}
        ></LeftContainer>
        <RightContainer 
          getLocationDataFromLocationName={getLocationDataFromLocationName} 
          getPlaceDataFromLocationName={getPlaceDataFromLocationName}
          addToLocationList={addToLocationList} 
          changeLocationList={changeLocationList} 
          locationList={locationList}
          setSelectedPlanDay={setSelectedPlanDay}
          selectedPlanDay={selectedPlanDay}
          setIsReArrange={setIsReArrange}
          >
        </RightContainer>
      </TotalContainer>
    </div>
  );
};

export default PlanTripPage;
