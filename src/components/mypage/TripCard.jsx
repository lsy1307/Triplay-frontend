import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

// Define an array of pastel gradient styles
const gradientStyles = [
  'linear-gradient(to right, #FFDEE9, #B5FFFC)',
  'linear-gradient(to right, #FAD0C4, #FFD1FF)',
  'linear-gradient(to right, #C1DFE3, #E9E4F0)',
  'linear-gradient(to right, #FEE140, #FA709A)',
  'linear-gradient(to right, #A1FFCE, #FAFFD1)',
];

const TripCard = ({ trip }) => {
  const { tripId, tripTitle, tripParty, tripStartDate, tripEndDate, places } = trip;
  const navigate = useNavigate();

  // Randomly select a gradient from the array
  const randomGradient = gradientStyles[Math.floor(Math.random() * gradientStyles.length)];

  // Handle card click to navigate to detail page
  const handleCardClick = () => {
    navigate(`/plan/${tripId}`); // Navigate to the detail page with the tripId
  };

  return (
    <CardContainer onClick={handleCardClick}>
      <Header style={{ background: randomGradient }} />
      <Content>
        <Section>
          <TextTitle>{tripTitle || '제목 없음'}</TextTitle>
          <SubText>{tripParty || '정보 없음'}</SubText>
        </Section>
        <Details>
          <DetailColumn>
            <DetailLabel>Start Date</DetailLabel>
            <DetailValue>{tripStartDate}</DetailValue>
          </DetailColumn>
          <DetailColumn>
            <DetailLabel>End Date</DetailLabel>
            <DetailValue>{tripEndDate}</DetailValue>
          </DetailColumn>
        </Details>
      </Content>
    </CardContainer>
  );
};

export default TripCard;

// Styled Components
const CardContainer = styled.div`
  width: 300px;
  background-color: #ffffff;
  border-radius: 20px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  position: relative;
  margin: 20px auto;
  cursor: pointer; // Makes the card look clickable
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.2);
  }
`;

const Header = styled.div`
  padding: 25px 20px;
  text-align: center;
`;

const Content = styled.div`
  padding: 20px;
  background-color: #fff;
`;

const Section = styled.div`
  text-align: center;
  margin-bottom: 20px;
`;

const TextTitle = styled.h3`
  font-size: 22px;
  font-weight: bold;
  margin: 0;
  color: #333;
`;

const SubText = styled.p`
  font-size: 16px;
  color: #888;
  margin: 5px 0 0;
`;

const Details = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const DetailColumn = styled.div`
  text-align: center;
`;

const DetailLabel = styled.p`
  font-size: 12px;
  color: #aaa;
  margin: 0 0 5px;
`;

const DetailValue = styled.p`
  font-size: 14px;
  font-weight: bold;
  color: #333;
  margin: 0;
`;
