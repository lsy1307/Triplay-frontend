import React, { useEffect, useState } from 'react';
import Header from '../../layout/Header';
import LeftContainer from '../../components/plan/PlanLeftContainer';
import RightContainer from '../../components/plan/PlanRightContainer';
import { fetchTripDetails } from '../../api/tripDetail';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';

const PlanDetail = () => {
  const { tripId } = useParams(); // Get tripId from the URL
    console.log(tripId); // Debugging: Check if tripId is undefined
  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getTrip = async () => {
      try {
        const fetchedTrip = await fetchTripDetails(tripId); // Fetch trip details
        setTrip(fetchedTrip);
      } catch (error) {
        console.error('Error fetching trip details:', error);
      } finally {
        setLoading(false);
      }
    };
    getTrip();
  }, [tripId]);

  if (loading) {
    return <div>여행 정보를 가져오는 중입니다...</div>;
  }

  if (!trip) {
    return <div>여행을 찾을 수 없습니다.</div>;
  }

  return (
    <div>
      <Header />
      <Container>
        <LeftContainer trip={trip} />
        <RightContainer trip={trip} />
      </Container>
    </div>
  );
};

export default PlanDetail;

// Styled Components
const Container = styled.div`
  display: flex;
  width: 100%;
  height: calc(100vh - 60px);
  padding: 30px 60px;
`;
