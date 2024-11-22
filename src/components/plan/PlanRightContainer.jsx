import React, { useState } from 'react';
import styled from 'styled-components';
import { format } from 'date-fns';

const PlanRightContainer = ({ trip }) => {
  const { tripStartDate, tripEndDate, places } = trip;
  const days = generateDaysObject(tripStartDate, tripEndDate, places);

  const handleAddComment = (comment) => {
    // Logic to add a comment (to be integrated with backend)
    console.log("New Comment:", comment);
  };

  return (
    <RightContainer>
      {Object.keys(days).map((date, index) => (
        <DayCard key={index} date={date} places={days[date]} dayIndex={index + 1} />
      ))}
      <CommentSection>
        <CommentInput placeholder="댓글을 입력하세요" />
        <CommentButton onClick={() => handleAddComment("Sample Comment")}>
          댓글 추가
        </CommentButton>
      </CommentSection>
    </RightContainer>
  );
};

export default PlanRightContainer;

// Component to render individual day cards with toggle functionality
const DayCard = ({ date, places, dayIndex }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <DayCardContainer>
      <DayHeader onClick={toggleOpen}>
        <DayTitle>{dayIndex}일차 ({date})</DayTitle>
        <ToggleButton>{isOpen ? '▼' : '▶'}</ToggleButton>
      </DayHeader>
      {isOpen && (
        <PlaceList>
          {places.map((place, index) => (
            <PlaceCard key={index}>
              <PlaceDetails>
                <PlaceName>{index + 1}. {place.locationName || '장소 정보 없음'}</PlaceName>
                <PlaceAddress>주소: {place.address || '주소 정보 없음'}</PlaceAddress>
                {place.openingHours && (
                  <PlaceHours>영업시간: {place.openingHours}</PlaceHours>
                )}
              </PlaceDetails>
              {place.photoUrl && (
                <PlaceImage
                  src={place.photoUrl}
                  alt={place.locationName || `장소 ${index + 1}`}
                />
              )}
            </PlaceCard>
          ))}
        </PlaceList>
      )}
    </DayCardContainer>
  );
};

// Function to group places by day
const generateDaysObject = (startDate, endDate, places) => {
  const days = {};
  let currentDate = new Date(startDate);
  const lastDate = new Date(endDate);

  while (currentDate <= lastDate) {
    const formattedDate = format(currentDate, 'yyyy-MM-dd');
    days[formattedDate] = [];
    currentDate.setDate(currentDate.getDate() + 1);
  }

  places.forEach((place) => {
    const visitDate = new Date(startDate);
    visitDate.setDate(visitDate.getDate() + (place.planDay - 1));
    const formattedVisitDate = format(visitDate, 'yyyy-MM-dd');

    if (days[formattedVisitDate]) {
      days[formattedVisitDate].push(place);
    }
  });

  Object.keys(days).forEach((date) => {
    days[date].sort((a, b) => a.idx - b.idx);
  });

  return days;
};

// Styled Components
const RightContainer = styled.div`
  flex: 1;
  padding: 20px;
  box-sizing: border-box;
  overflow-y: auto;
`;

const DayCardContainer = styled.div`
  background-color: #f9f9f9;
  margin-bottom: 30px; /* Increased spacing between day cards */
  border-radius: 8px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const DayHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  background-color: #95D776;
  color: black;
  cursor: pointer;
`;

const DayTitle = styled.h4`
  margin: 0;
  font-size: 18px;
`;

const ToggleButton = styled.span`
  font-size: 16px;
`;

const PlaceList = styled.div`
  padding: 15px;
  background-color: #ffffff;
`;

const PlaceCard = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 20px; /* Increased spacing between place cards */
  padding: 20px; /* Increased padding */
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1);
`;

const PlaceDetails = styled.div`
  flex: 1;
  margin-right: 15px;
`;

const PlaceName = styled.h4`
  font-size: 18px;
  font-weight: bold;
  margin: 0;
  color: #333;
`;

const PlaceAddress = styled.p`
  font-size: 16px;
  color: #555;
  margin: 5px 0;
`;

const PlaceHours = styled.p`
  font-size: 15px;
  color: #777;
  margin: 5px 0 0;
`;

const PlaceImage = styled.img`
  width: 150px; /* Increased image width */
  height: 150px; /* Increased image height */
  border-radius: 8px;
  object-fit: cover;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
`;

const CommentSection = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;
`;

const CommentInput = styled.input`
  flex: 1;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 8px;
  margin-right: 10px;
`;

const CommentButton = styled.button`
  padding: 10px 15px;
  background-color: #95D776;
  color: black;
  border: none;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background-color: #45a049;
  }
`;

