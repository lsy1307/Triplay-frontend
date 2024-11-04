import React, { useEffect, useState } from 'react';
import Map from '../map/MyMap.jsx';
import styled from 'styled-components';
import TripTitleContainer from './titleContainer/TripTitleContainer.jsx';
import UploadReadyContainer from './upperContainer/UploadReadyContainer.jsx';
import ClipImageUploadComponent from '../clipMakePage/upperContainer/ClipImageUploadComponent.jsx';


const UpperContainer = (props) => {
  const [coordinates, setCoordinates] = useState({ lat: -1, lng: -1 });
  const [markers, setMarkers] = useState([]); // TODO:: 여기에도 값 추가

  useEffect(() => {
    const newMarkers = props.locationList.filter(
      (location) => location.planDay === props.selectedPlanDay,
    );
    console.log(newMarkers);
    if (
      !(newMarkers.length <= 0 &&
      coordinates.lat === -1 &&
      coordinates.lng === -1)
    ) {
      setMarkers(newMarkers);
    }
  }, [props.locationList, props.selectedPlanDay, props.isReArrange]);

  return (
    <>
      <TripTitleContainer
        tripInfo={props.tripInfo}
        imageFiles={props.imageFiles}
        isReady={props.isReady}
        handleChangeIsReady={props.handleChangeIsReady}
        isUploaded={props.isUploaded}
        handleChangeIsUploaded={props.handleChangeIsUploaded}
      />
      {props.isReady ? (
        props.isUploaded ? (
          <ClipImageUploadComponent 
            imageFiles={props.imageFiles}
            setImageFiles={props.setImageFiles}
            handleRemoveFile={props.handleRemoveFile}
            handleFileChange={props.handleFileChange}
          />
        ) : (
          <UploadReadyContainer
            imageFiles={props.imageFiles}
          />
        )
      ) : (
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
      )}
    </>
  );
}

const MapContainer = styled.div`
  width: 100%;
  height: 40vh;
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

export default UpperContainer