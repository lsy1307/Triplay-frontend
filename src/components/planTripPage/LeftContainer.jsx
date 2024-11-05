import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import Map from '../map/MyMap';
import TripLocationContentContainer from './leftContainer/TripLocationContentContainer';

const LeftContainer = (props) => {
  const [isMapOn, setIsMapOn] = useState(false);
  const [coordinates, setCoordinates] = useState({ lat: -1, lng: -1 });
  const [markers, setMarkers] = useState([]);

  const onChangeTripTitleInputHandler = (e) => {
    props.setTripTitle(e.target.value);
  };

  useEffect(() => {
    const newMarkers = props.locationList.filter(
      (location) => location.planDay === props.selectedPlanDay,
    );
    if (newMarkers.length <= 0 && coordinates.lat === -1 && coordinates.lng === -1) {
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
          value={props.tripTitle}
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
            setIsMapOn={setIsMapOn}
            setCoordinates={setCoordinates}
          />
        )}
      </TripLocationContentsContainer>
    </Container>
  );
};

export default LeftContainer;

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 20px;
  box-sizing: border-box;
`;

const TripTitleInput = styled.input`
  width: 70%;
  height: 60px;
  font-size: 1.8rem;
  font-weight: bold;
  margin-bottom: 20px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-sizing: border-box;
  outline: none;
  text-align: center; /* 가운데 정렬 */

  &::placeholder {
    font-size: 1.5rem;
    color: #888;
    text-align: center; /* placeholder도 가운데 정렬 */
  }
`;

const TripLocationContentsContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MapContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MapWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
