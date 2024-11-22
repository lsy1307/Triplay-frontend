import React, { useState, useEffect } from 'react';
import styled from 'styled-components'; // Ensure styled-components is correctly imported
import { useParams } from 'react-router-dom'; // Import useParams to get URL parameters
import LeftContainer from '../../components/planTripPage/LeftContainer';
import RightContainer from '../../components/planTripPage/RightContainer';
import { fetchTripDetails, updateTrip } from '../../api/tripDetail';
import Header from '../../layout/Header';

const PlanEdit = () => {
  const { tripId } = useParams();
  const [tripTitle, setTripTitle] = useState('');
  const [dateRange, setDateRange] = useState([null, null]);
  const [partyName, setPartyName] = useState('');
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchTripDetails(tripId);
        setTripTitle(data.title);
        setDateRange([new Date(data.tripStartDate), new Date(data.tripEndDate)]);
        setPartyName(data.partyName);
        setPlaces(data.places || []);
      } catch (error) {
        console.error('Failed to fetch trip details:', error);
      }
    };

    fetchData();
  }, [tripId]);

  const handleSave = async () => {
    try {
      const updatedTrip = {
        title: tripTitle,
        tripStartDate: dateRange[0],
        tripEndDate: dateRange[1],
        partyName,
        places,
      };
      await updateTrip(tripId, updatedTrip);
      alert('여행 계획이 성공적으로 수정되었습니다.');
      // Navigate to another page if needed
    } catch (error) {
      console.error('Failed to update trip:', error);
      alert('여행 계획 수정에 실패했습니다.');
    }
  };

  return (
    <>
      <Header />
      <ContentContainer>
        <LeftContainer
          tripTitle={tripTitle}
          setTripTitle={setTripTitle}
          tripParty={partyName}
          setTripParty={setPartyName}
        />
        <RightContainer
          dateRange={dateRange}
          setDateRange={setDateRange}
          partyName={partyName}
          setPartyName={setPartyName}
          places={places}
          setPlaces={setPlaces}
          onSave={handleSave}
        />
      </ContentContainer>
    </>
  );
};

export default PlanEdit;

// Styled Components
const ContentContainer = styled.div`
  display: flex;
  width: 100%;
  height: calc(100vh - 60px); /* Adjust height to account for Header */
  padding: 20px;
  box-sizing: border-box;
  overflow-y: auto; /* Allows scrolling if content overflows */
`;
