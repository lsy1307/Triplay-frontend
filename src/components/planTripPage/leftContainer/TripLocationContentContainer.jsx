import React, { useState } from 'react';
import styled from 'styled-components';
import locations from '../../locations';
import { getGooglePlaceDataByLocationName } from '../../../api/tripInfo';

const TripLocationContentContainer = (props) => {
  const [selectedLocation, setSelectedLocation] = useState('');
  const [isInclude, setIsInclude] = useState(false);

  const onChangeLocationSearchinputHandler = (e) => {
    setSelectedLocation(e.target.value);
    const locationObject = locations.find(
      (location) => location.name === e.target.value
    );
    setIsInclude(!!locationObject);
  };

  const onKeyDownHandler = async (e) => {
    if (e.key === 'Enter') {
      const locationObject = locations.find(
        (location) => location.name === selectedLocation
      );
      if (locationObject) {
        props.setIsMapOn(true);
        const res = await getGooglePlaceDataByLocationName(locationObject.fullName);
        const coords = res.data.results[0].geometry.location;
        props.setCoordinates({ lat: coords.lat, lng: coords.lng });
      }
    }
  };

  const handleLocationChange = (location) => {
    setSelectedLocation(location);
  };

  return (
    <Container>
      <TripLocationSearchInput
        placeholder="여행지 검색"
        value={selectedLocation}
        onChange={onChangeLocationSearchinputHandler}
        onKeyDown={onKeyDownHandler}
      />
      <TripLocationsWrapper>
        {isInclude ? (
          <LocationCard
            isSelected="true"
            onClick={() => handleLocationChange(selectedLocation)}
          >
            {selectedLocation}
          </LocationCard>
        ) : (
          locations.map((location, index) => (
            <LocationCard
              key={index}
              isSelected={`${selectedLocation === location.name}`}
              onClick={() => handleLocationChange(location.name)}
            >
              {location.name}
            </LocationCard>
          ))
        )}
      </TripLocationsWrapper>
    </Container>
  );
};

export default TripLocationContentContainer;

const Container = styled.div`
  width: 100%;
  height: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TripLocationSearchInput = styled.input`
  width: 80%;
  max-width: 500px;
  height: 50px;
  margin: 20px 0;
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 10px;
  font-size: 1.2rem;
  outline: none;
  box-sizing: border-box;
  background-color: #f9f9f9;

  &::placeholder {
    color: #bbb;
  }
`;

const TripLocationsWrapper = styled.div`
  width: 90%;
  max-width: 600px;
  padding: 10px;
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  overflow-y: auto;
  justify-content: center;
  align-items: flex-start;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const LocationCard = styled.div`
  width: 120px;
  height: 40px;
  padding: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ isSelected }) =>
    isSelected === 'true' ? '#e0f7fa' : '#ffffff'};
  color: ${({ isSelected }) => (isSelected === 'true' ? '#00796b' : '#333')};
  border: 1px solid ${({ isSelected }) => (isSelected === 'true' ? '#00796b' : '#ddd')};
  border-radius: 8px;
  transition: all 0.2s;

  &:hover {
    background-color: #f0f0f0;
  }
`;
