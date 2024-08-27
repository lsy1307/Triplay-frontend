import React, {useState, useEffect} from "react";
import styled from "styled-components";
import { useNavigate } from 'react-router-dom'; // useNavigate 훅을 불러옵니다.

import axios from "axios";

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

  // 여행 지역 이름으로 지역 위치 정보 얻어오는 함수임
  const getLocationDataFromLocationName = async (searchLocation) => {
    const geocodeUrl =
      `https://maps.googleapis.com/maps/api/geocode/json` +
      `?address=${encodeURIComponent(searchLocation)}` +
      `&key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}`;

    try {
      const response = await axios.get(geocodeUrl);
      if (response.data.status === "OK") {
        console.log(response);
        const lat = response.data.results[0].geometry.location.lat;
        const lng = response.data.results[0].geometry.location.lng;
        const formatted_address = response.data.results[0].formatted_address;
        let res = {
          lat:lat,
          lng:lng,
          address:formatted_address
        }

        return res;
      } else {
        alert("지역을 찾을 수 없습니다.");
      }
    } catch (error) {
      console.error("Geocoding API 요청 중 오류 발생:", error);
    }
  };

  // 여행 지역 이름으로 지역 상세 정보 얻어오는 함수임. 위에 함수보다 상위버전인데 api 호출을 2번 해야함.
  const getPlaceDataFromLocationName = async (searchLocation) => {
    const response = await fetch(`http://localhost:8080/place?location=${encodeURIComponent(searchLocation)}`);
    const data = await response.json();
    console.log(data);
    return data;
  };

  const addToLocationList = (data) => {
    setLocationList([...locationList, data]);
  }

  const changeLocationList = (data) => {
    setLocationList(data);
  }

  useEffect(() => {console.log(locationList);},[locationList]);

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
