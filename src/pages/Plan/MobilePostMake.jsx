import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import UpperContainer from '../../components/postMakePage/UpperContainer.jsx';
import LowerContainer from '../../components/postMakePage/LowerContainer.jsx';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import MobileHeader from '../../layout/MobileHeader.jsx';
import { GetAxiosInstance } from '../../axios/AxiosMethod.js';


const MobilePostMake = () => {
  // TODO :: Trip, TripDate, Place 정보 받아오기
  // TODO :: 해당 data를 바탕으로 구글 맵 띄우기
  // TODO :: 밑에 trip domain data들에 대해 정보 띄우기(Component화)
  const { tripId } = useParams();

  const [maxPlanDay, setMaxPlanDay] = useState(0)
  const [locationList, setLocationList] = useState([]); // TODO :: 여기에 값 추가
  const [selectedPlanDay, setSelectedPlanDay] = useState(0);
  const [isReArrange, setIsReArrange] = useState(false);
  const [tripInfo, setTripInfo] = useState({});
  const [imageFiles, setImageFiles] = useState([])
  const [isReady, setIsReady] = useState(false)

  const addToLocationList = (data) => {
    setLocationList(prevList => [...prevList, data]); // 이전 상태를 기반으로 상태 업데이트
  };
  const changeLocationList = (data) => {
    setLocationList(data);

  };

  const handleRemoveFile = (index) => {
    setImageFiles((prevImageFiles) => prevImageFiles.filter((_, i) => i !== index))
  }

  const handleFileChange = (newImageFile) => {
    setImageFiles((prevImageFiles) => [...prevImageFiles, newImageFile]);
  }

  const handleTripInfoChange = (key, value) => {
    setTripInfo((prevState) => ({
      ...prevState,
      [key]: value
    }))
  }

  const handleChangeIsReady = () => {
    setIsReady(prev => !prev);
  }

  const addMaxPlanDay = () => {
    setMaxPlanDay(prev => prev + 1)
  }

  const getTripDateInfo = async () => {
    const res = await GetAxiosInstance(`https://localhost:8443/trip/${tripId}`)
    console.log(res.data)
    handleTripInfoChange('tripStartDate', res.data["tripStartDate"])
    handleTripInfoChange('tripEndDate', res.data["tripEndDate"])
    handleTripInfoChange('tripParty', res.data["tripParty"])
    handleTripInfoChange('tripId', tripId)
    handleTripInfoChange('tripTitle', res.data["tripTitle"])
    res.data["places"].forEach(place => {
      const idx =
        locationList.length > 0
          ? locationList[locationList.length - 1].idx + 1
          : 0;
      const data = {
        placeId: place["placeId"],
        idx: place["idx"],
        planDay: place["planDay"],
        lat: place["lat"],
        lng: place["lng"],
        address: place["address"],
        locationName: place["locationName"],
        photoUrl: place["photoUrl"],
        phoneNumber: place["phoneNumber"],
        openData: place["openData"],
      };
      if(place["planDay"] > maxPlanDay) setMaxPlanDay(place["planDay"])
      addToLocationList(data);
    })
  }

  useEffect(()=> {
    getTripDateInfo();
  },[])

  useEffect(() => {
    console.log(locationList)
  }, [locationList]);

  return <>
    <MobileHeader />
    <TotalContainer>
      <UpperContainer
        selectedPlanDay={selectedPlanDay}
        locationList={locationList}
        isReArrange={isReArrange}
        setIsReArrange={setIsReArrange}

        isReady={isReady}
        handleChangeIsReady={handleChangeIsReady}
        tripInfo={tripInfo}
        imageFiles={imageFiles}
        handleRemoveFile={handleRemoveFile}
        handleFileChange={handleFileChange}
      ></UpperContainer>
      <LowerContainer
        locationList={locationList}
        maxPlanDay={maxPlanDay}
        addMaxPlanDay={addMaxPlanDay}
        addToLocationList={addToLocationList}
        changeLocationList={changeLocationList}
        selectedPlanDay={selectedPlanDay}
        setSelectedPlanDay={setSelectedPlanDay}
        setIsReArrange={setIsReArrange}

        isReady={isReady}
        imageFiles={imageFiles}
        handleRemoveFile={handleRemoveFile}
        handleFileChange={handleFileChange}
      ></LowerContainer>
    </TotalContainer>
    {isReady && <ReturnButton onClick={handleChangeIsReady}><ReturnIconSvg icon={faArrowLeft}/>Return</ReturnButton>}
  </>
}

const TotalContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`

const ReturnButton = styled.button`
    position: fixed;
    bottom: 1rem;
    left: 1rem;
    border-radius: 0.5rem;
    background-color: black;
    color: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 5rem;
    height: 5rem;
`

const ReturnIconSvg = styled(FontAwesomeIcon)`
    width: 2rem;
    height: 2rem;
`

export default MobilePostMake