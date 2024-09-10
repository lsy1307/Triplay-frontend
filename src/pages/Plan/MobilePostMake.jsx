import React, { useState, useEffect } from 'react';
import { getLocationDataFromLocationName, getPlaceDataFromLocationName } from '../../api/tripInfo.js';
import UpperContainer from '../../components/postMakePage/UpperContainer.jsx';
import LowerContainer from '../../components/postMakePage/LowerContainer.jsx';
import styled from 'styled-components';
import MobileHeader from '../../layout/MobileHeader.jsx';


const MobilePostMake = () => {
  // TODO :: Trip, TripDate, Place 정보 받아오기
  // TODO :: 해당 data를 바탕으로 구글 맵 띄우기
  // TODO :: 밑에 trip domain data들에 대해 정보 띄우기(Component화)


  const [locationList, setLocationList] = useState([]); // TODO :: 여기에 값 추가
  const [selectedPlanDay, setSelectedPlanDay] = useState(0);
  const [isReArrange, setIsReArrange] = useState(false);
  const addToLocationList = (data) => {
    setLocationList([...locationList, data]);
  };
  const changeLocationList = (data) => {
    setLocationList(data);
  };

  const [postId, setPostId] = useState(0)
  const [images, setImages] = useState([]);

  useEffect(() => {
    // TODO :: api 호출해서 값 가져오기
  }, []);

  return <>
    <MobileHeader />
    <TotalContainer>
      <UpperContainer
        getLocationDataFromLocationName={getLocationDataFromLocationName}
        selectedPlanDay={selectedPlanDay}
        locationList={locationList}
        isReArrange={isReArrange}
        setIsReArrange={setIsReArrange}
      ></UpperContainer>
      <LowerContainer
        getLocationDataFromLocationName={getLocationDataFromLocationName}
        getPlaceDataFromLocationName={getPlaceDataFromLocationName}
        addToLocationList={addToLocationList}
        changeLocationList={changeLocationList}
        locationList={locationList}
        setSelectedPlanDay={setSelectedPlanDay}
        selectedPlanDay={selectedPlanDay}
        setIsReArrange={setIsReArrange}
      ></LowerContainer>
    </TotalContainer>
  </>
}

const TotalContainer = styled.div`
    width: 100%;
    height: 85vh;
    display: flex;
    justify-content: center;
    align-items: center;
`

export default MobilePostMake