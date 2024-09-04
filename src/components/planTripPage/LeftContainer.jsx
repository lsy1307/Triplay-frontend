import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import Map from '../map/MyMap';
import TripLocationContentContainer from './leftContainer/TripLocationContentContainer';

const LeftContainer = (props) => {
  // 여행 제목 입력값
  const [tripTitle, setTripTitle] = useState('');

  // 여행지 검색하고 엔터 눌렀을 때, 지도 띄우기 여부
  const [isMapOn, setIsMapOn] = useState(false);

  // 검색한 지역의 좌표값 저장
  const [coordinates, setCoordinates] = useState({ lat: -1, lng: -1 });

  const [markers, setMarkers] = useState([]);

  /* 여행 제목 입력 */
  const onChangeTripTitleInputHandler = (e) => {
    setTripTitle(e.target.value);
  };

  useEffect(() => {
    const newMarkers = props.locationList.filter(
      (location) => location.planDay === props.selectedPlanDay,
    );
    console.log(newMarkers);
    if (
      newMarkers.length <= 0 &&
      coordinates.lat === -1 &&
      coordinates.lng === -1
    ) {
      setIsMapOn(false);
    } else {
      setMarkers(newMarkers);
      setIsMapOn(true);
    }
  }, [props.locationList, props.selectedPlanDay, props.isReArrange]);

  return (
    <Container>
      <TripLocationContentsContainer>
        <TripTitleInput
          placeholder="여행 제목을 입력해주세요"
          value={tripTitle}
          onChange={onChangeTripTitleInputHandler}
        />
        {isMapOn ? (
          <MapContainer>
            <MapWrapper>
              <Map
                selectedLat={coordinates.lat}
                selectedLng={coordinates.lng}
                locationList={props.locationList}
                markers={markers}
                isReArrange={props.isReArrange}
                setIsReArrange={props.setIsReArrange}
                selectedPlanDay={props.selectedPlanDay}
              />
            </MapWrapper>
          </MapContainer>
        ) : (
          <TripLocationContentContainer
            getLocationDataFromLocationName={
              props.getLocationDataFromLocationName
            }
            setIsMapOn={setIsMapOn}
            setCoordinates={setCoordinates}
          ></TripLocationContentContainer>
        )}
      </TripLocationContentsContainer>
    </Container>
  );
};

export default LeftContainer;

const Container = styled.div`
  width: 50%;
  height: 80%;
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid black;
`;

const TripTitleInput = styled.input`
  width: 100%;
  height: 10%;
  font-size: 2.5rem;
  margin-left: 40px;
  border: none;
  outline: none;
  display: flex;
  align-items: center;
  &::placeholder {
    font-size: 2.5rem; /* placeholder 글자 크기 조절 */
    font-weight: 1000;
  }
`;

const TripLocationContentsContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const MapContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MapWrapper = styled.div`
  width: 90%;
  height: 90%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
