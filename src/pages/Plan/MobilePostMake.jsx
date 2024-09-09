import React, { useState, useEffect } from 'react';
import Map from '../../components/map/MyMap.jsx';
import Header from '../../layout/Header.jsx';
import { getLocationDataFromLocationName, getPlaceDataFromLocationName } from '../../api/tripInfo.js';
import UpperContainer from '../../components/postMakePage/UpperContainer.jsx';
import LowerContainer from '../../components/postMakePage/LowerContainer.jsx';


const MobilePostMake = () => {
  // TODO :: Trip, TripDate, Place 정보 받아오기
  // TODO :: 해당 data를 바탕으로 구글 맵 띄우기
  // TODO :: 밑에 trip domain data들에 대해 정보 띄우기(Component화)


  const [locationList, setLocationList] = useState([]);
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

  }, []);

  return <>
    <Header />
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

export default MobilePostMake