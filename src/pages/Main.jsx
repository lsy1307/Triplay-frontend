import React from 'react';
import styled from 'styled-components';
import Header from '../layout/Header';
import { useNavigate } from 'react-router-dom';
import planImg1 from '../assets/images/planTripStartPage/plantrip1.png';
import planImg2 from '../assets/images/planTripStartPage/plantrip2.png';
import planImg3 from '../assets/images/planTripStartPage/plantrip3.png';
import planImg4 from '../assets/images/planTripStartPage/plantrip4.png';
import planImg5 from '../assets/images/planTripStartPage/plantrip5.png';

const Main = () => {
  const navigate = useNavigate();

  const goToPlanTripPage = () => navigate('/plan');

  return (
    <PageWrapper>
      <Header />
      <MainContainer>
        {/* Upper Section */}
        <Section>
          <LeftSide>
            <LargeImageWrapper>
              <StyledImage src={planImg1} alt="Plan your trip" />
            </LargeImageWrapper>
          </LeftSide>
          <RightSide>
            <Content>
              <HeaderText>
                Triplay: 여행의 즐거움에 <br />
                게임의 재미를 더하다!
              </HeaderText>
              <Description>
                여행 준비부터 여행 이후의 추억까지 <br />
                TripPlay를 통해 더 특별한 경험으로 만들어보세요!
              </Description>
              <ActionButton onClick={goToPlanTripPage}>여행 계획 세우러 가기</ActionButton>
            </Content>
          </RightSide>
        </Section>

        {/* Lower Section */}
        <Section alternate>
          <LeftSide>
            <Content>
              <HeaderText>Post & Clip</HeaderText>
              <Description>
                다른 사람의 여행을 참고해서 자신의 여행 계획을 <br />
                간편하게 작성해보세요. 여러분의 추억도 함께 공유할 수 있어요.
              </Description>
              <ActionButton>다른 여행 계획 둘러보기</ActionButton>
            </Content>
          </LeftSide>
          <RightSide>
            <ImageGrid>
              <StyledImage src={planImg2} alt="" />
              <StyledImage src={planImg3} alt="" />
              <StyledImage src={planImg4} alt="" />
              <StyledImage src={planImg5} alt="" />
            </ImageGrid>
          </RightSide>
        </Section>
      </MainContainer>
    </PageWrapper>
  );
};

export default Main;

// Styled Components
const PageWrapper = styled.div`
  font-family: Arial, sans-serif;
`;

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

const Section = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 40px; /* Reduced gap between sections */
  padding: 60px 80px;
  background-color: ${(props) => (props.alternate ? '#f9f9f9' : 'white')};
`;

const LeftSide = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const RightSide = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LargeImageWrapper = styled.div`
  max-width: 900px; /* Increased size for the first image */
  max-height: 500px;
  width: 100%;
  height: 100%;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 15px; /* Reduced gap between content elements */
  width: 66%; /* Set width to 2/3 of its parent container */
  max-width: 600px; /* Optional: Limit maximum width for consistent appearance */
`;

const HeaderText = styled.h1`
  font-size: 2.4rem;
  font-weight: bold;
  color: #333;
`;

const Description = styled.p`
  font-size: 1.2rem;
  line-height: 1.6;
  color: #555;
`;

const ActionButton = styled.button`
  padding: 12px 24px;
  font-size: 1rem;
  font-weight: bold;
  background-color: #000;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;

const ImageGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  max-width: 500px;
  max-height: 400px;
  width: 100%;
`;
