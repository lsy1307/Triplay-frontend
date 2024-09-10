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

  const [imageFiles, setImageFiles] = useState([])
  const handleRemoveFile = (index) => {
    setImageFiles((prevImageFiles) => prevImageFiles.filter((_, i) => i !== index))
  }

  const handleFileChange = (newImageFile) => {
    setImageFiles((prevImageFiles) => [...prevImageFiles, newImageFile]);
  }

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

        imageFiles={imageFiles}
        handleRemoveFile={handleRemoveFile}
        handleFileChange={handleFileChange}
      ></UpperContainer>
      <LowerContainer
        getLocationDataFromLocationName={getLocationDataFromLocationName}
        getPlaceDataFromLocationName={getPlaceDataFromLocationName}
        locationList={locationList}
        addToLocationList={addToLocationList}
        changeLocationList={changeLocationList}
        selectedPlanDay={selectedPlanDay}
        setSelectedPlanDay={setSelectedPlanDay}
        setIsReArrange={setIsReArrange}

        imageFiles={imageFiles}
        handleRemoveFile={handleRemoveFile}
        handleFileChange={handleFileChange}
      ></LowerContainer>
    </TotalContainer>
  </>
}

const TotalContainer = styled.div`
    width: 100%;
    height: 85vh;
    display: flex;
    flex-direction: column;
    align-items: center;
`

export default MobilePostMake