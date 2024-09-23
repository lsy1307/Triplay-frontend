import styled, {keyframes} from 'styled-components';
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

const TripPlaceContainer = (props) => {

  const handleDeleteClick = (location) => {
    const foundIndex = props.locationList.findIndex(foundLocation =>
      foundLocation.planDay === location.planDay && foundLocation.idx === location.idx
    );
    const updatedLocationList = [
      ...props.locationList.slice(0, foundIndex),
      ...props.locationList.slice(foundIndex + 1)
    ];

    props.changeLocationList(updatedLocationList);
  };

  return <PlaceContainer>
    <PlaceHeader>
      <LocationInfo>
        <LocationName>{props.location.locationName}</LocationName>
        <LocationAddress>{props.location.address}</LocationAddress>
      </LocationInfo>
      <EditButton icon={faXmark} onClick={() => handleDeleteClick(props.location)}></EditButton>
    </PlaceHeader>
    <PlaceBody>

    </PlaceBody>
  </PlaceContainer>
}

export default TripPlaceContainer

const PlaceContainer = styled.div`
    border-radius: 0.5rem;
    background-color: #d5d5d5;
`

const PlaceHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.5rem;
`

const LocationInfo = styled.div`

`

const LocationName = styled.div`
  font-weight: bold;
`

const LocationAddress = styled.div`
  
`

const EditButton = styled(FontAwesomeIcon)`
    width: 1.5rem;
    height: 1.5rem;
`

const PlaceBody = styled.div`
`