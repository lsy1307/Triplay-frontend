import React from 'react';
import styled from 'styled-components';
import { GoogleMap, Marker } from '@react-google-maps/api';

const PlanLeftContainer = ({ trip }) => {
  const { tripTitle, tripStartDate, tripEndDate, tripParty, places } = trip;

  // Map container style
  const mapContainerStyle = {
    width: '100%',
    height: '400px',
    borderRadius: '10px',
  };

  // Default map center (set to Jeju Island as a fallback)
  const center = places?.length
    ? { lat: places[0].lat, lng: places[0].lng }
    : { lat: 33.450701, lng: 126.570667 };

  return (
    <LeftContainer>
      <Header>
        <TitleSection>
          <TripTitle>{tripTitle || '제목 없음'}</TripTitle>
          <TripDate>
            {tripStartDate} ~ {tripEndDate}
          </TripDate>
        </TitleSection>
        <WhoWith>{tripParty || '정보 없음'}</WhoWith>
      </Header>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={10}
      >
        {places &&
          places.map((place, index) => (
            <Marker
              key={index}
              position={{ lat: place.lat, lng: place.lng }}
              label={`${index + 1}`} // Numbered labels for markers
              title={place.locationName || `장소 ${index + 1}`} // Tooltip with place name
            />
          ))}
      </GoogleMap>
    </LeftContainer>
  );
};

export default PlanLeftContainer;

// Styled Components
const LeftContainer = styled.div`
  flex: 1;
  margin-right: 20px;
  padding: 20px;
  box-sizing: border-box;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between; /* Align title and "who with" section */
  align-items: center; /* Vertically center items */
  margin-bottom: 20px;
`;

const TitleSection = styled.div`
  display: flex;
  flex-direction: column;
`;

const TripTitle = styled.h2`
  font-size: 28px; /* Larger font size for emphasis */
  font-weight: bold;
  margin: 0;
`;

const TripDate = styled.p`
  font-size: 16px;
  color: #555;
  margin: 5px 0 0;
`;

const WhoWith = styled.div`
  font-size: 16px;
  color: black;
  background: #b5e69f;
  border-radius: 5px;
  padding: 5px 10px;
`;
