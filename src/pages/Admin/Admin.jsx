import React, { useRef, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import styled from 'styled-components';
import Chart from 'chart.js/auto';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFlag, faFilm, faComment, faGamepad, faArrowRight, faArrowUp } from "@fortawesome/free-solid-svg-icons"; 
import AdminHeader from '../../layout/AdminHeader';

const data = [
  { name: '월', 액티비티: 95, 관광: 77, 휴양: 35 },
  { name: '화', 액티비티: 85, 관광: 87, 휴양: 70 },
  { name: '수', 액티비티: 80, 관광: 27, 휴양: 20 },
  { name: '목', 액티비티: 35, 관광: 17, 휴양: 77 },
  { name: '금', 액티비티: 30, 관광: 48, 휴양: 52 },
  { name: '토', 액티비티: 90, 관광: 55, 휴양: 49 },
  { name: '일', 액티비티: 70, 관광: 92, 휴양: 88 },
];

// 관리자 대시보드 뷰
const Admin = () => {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }

      const ctx = chartRef.current.getContext('2d');
      chartInstanceRef.current = new Chart(ctx, {
        type: 'line',
        data: {
          labels: data.map(item => item.name),
          datasets: [
            {
              label: '액티비티',
              data: data.map(item => item.액티비티),
              borderColor: '#1A5319',
              backgroundColor: 'rgba(26, 83, 25, 0.5)',
              fill: true,
            },
            {
              label: '관광',
              data: data.map(item => item.관광),
              borderColor: '#508D4E',
              backgroundColor: 'rgba(80, 141, 78, 0.5)',
              fill: true,
            },
            {
              label: '휴양',
              data: data.map(item => item.휴양),
              borderColor: '#80AF81',
              backgroundColor: 'rgba(128, 175, 129, 0.5)',
              fill: true,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            x: {
              stacked: true,
            },
            y: {
              stacked: false,
              beginAtZero: true,
              max: 100,
              ticks: {
                stepSize: 25
              }
            },
          },
          plugins: {
            legend: {
              position: 'left',
              labels: {
                font: {
                  family: 'KoreanHANAB',
                  size: 18
                }
              }
            },
            title: {
              display: true,
              text: '취향 별 접속 추이',
              font: {
                family: 'KoreanHANAL',
                size: 18
              }
            },
            tooltip: {
              mode: 'index'
            },
          },
        },
      });
    }

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, []);

  return (
    <Container>
      <AdminHeader />
      <ContentContainer>
        <TitleContainer>
          <Title>관리자 대시보드</Title>
          <StyledLink to='/admin/manage'>
            관리자 페이지&nbsp;&nbsp;
            <FontAwesomeIcon icon={faArrowRight} size='lg' />
          </StyledLink>
        </TitleContainer>
        <MainContent>
          <TopSection>
            <StatsContainer>
              <StatCard>
                <StatValue>13,000개</StatValue>
                <StatChangeContainer>
                  <StatChangePercentage>
                    <FontAwesomeIcon icon={faArrowUp} size='lg' />
                    30%
                  </StatChangePercentage>
                  <StatChangeCount>
                    +3,000
                  </StatChangeCount>
                </StatChangeContainer>
                <StatLabel>오늘 등록된 포스트 수</StatLabel>
              </StatCard>
              <StatCard>
                <StatValue>14,579개</StatValue>
                <StatChangeContainer>
                  <StatChangePercentage>
                    <FontAwesomeIcon icon={faArrowUp} size='lg' />
                    12%
                  </StatChangePercentage>
                  <StatChangeCount>
                    +1,579
                  </StatChangeCount>
                </StatChangeContainer>
                <StatLabel>전체 포스트 수</StatLabel>
              </StatCard>
              <StatCard>
                <StatValue>4,567명</StatValue>
                <StatChangeContainer>
                  <StatChangePercentage>
                    <FontAwesomeIcon icon={faArrowUp} size='lg' />
                    3%
                  </StatChangePercentage>
                  <StatChangeCount>
                    +119
                  </StatChangeCount>
                </StatChangeContainer>
                <StatLabel>전체 회원수</StatLabel>
              </StatCard>
              <AlertsContainer>
                <AlertCard>
                  <AlertItem>
                    <AlertContent>
                      <StyledIcon icon={faFlag} size='lg' />
                      <AlertText>포스트 신고</AlertText>
                    </AlertContent>
                    <AlertCount>1건</AlertCount>
                  </AlertItem>
                  <AlertItem>
                    <AlertContent>
                      <StyledIcon icon={faComment} size='lg' />
                      <AlertText>댓글 신고</AlertText>
                    </AlertContent>
                    <AlertCount>1건</AlertCount>
                  </AlertItem>
                  <AlertItem>
                    <AlertContent>
                      <StyledIcon icon={faFilm} size='lg' />
                      <AlertText>클립 신고</AlertText>
                    </AlertContent>
                    <AlertCount>1건</AlertCount>
                  </AlertItem>
                  <AlertItem>
                    <AlertContent>
                      <StyledIcon icon={faGamepad} size='lg' />
                      <AlertText>게임 신고</AlertText>
                    </AlertContent>
                    <AlertCount>1건</AlertCount>
                  </AlertItem>
                </AlertCard>
              </AlertsContainer>
            </StatsContainer>
          </TopSection>
          <BottomSection>
            <ChartContainer>
              <canvas ref={chartRef} />
            </ChartContainer>
            <SummaryContainer>
              <SummaryWrapper>
                <SummaryTitle>요약</SummaryTitle>
                <SummarySubtitle>최근 30일</SummarySubtitle>
              </SummaryWrapper>
              <SummaryItem>
                <SummaryLabel>신규 가입자수</SummaryLabel>
                <SummaryValue>1,577명</SummaryValue>
              </SummaryItem>
              <SummaryItem>
                <SummaryLabel>작성된 포스트 수</SummaryLabel>
                <SummaryValue>1,577개</SummaryValue>
              </SummaryItem>
              <SummaryItem>
                <SummaryLabel>작성된 댓글 수</SummaryLabel>
                <SummaryValue>123개</SummaryValue>
              </SummaryItem>
            </SummaryContainer>
          </BottomSection>
        </MainContent>
      </ContentContainer>
    </Container>
  );
};

export default Admin;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #ffffff;
`;

const ContentContainer = styled.main`
  padding: 2rem;
`;

const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  font-size: 1.7rem;
  // font-family: 'KoreanHANAB', sans-serif;
  font-family: 'KoreanHANAB', sans-serif;
`;

const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const TopSection = styled.div`
`;

const BottomSection = styled.div`
  display: flex;
  gap: 2rem;
`;

const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
`;

const StatCard = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 6px 6px rgba(0, 0, 0, 0.3);
  position: relative;
`;

const StatValue = styled.div`
  font-size: 1.7rem;
  font-family: 'BM DoHyeon', sans-serif;
  margin-bottom: 0.5rem;
`;

const StatChangeContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1.2rem;
  margin-bottom: 1.2rem;
`;

const StatChangePercentage = styled.div`
  display: flex;
  align-items: center;
  background-color: #E8F5E9;
  color: #4CAF50;
  padding: 0.25rem 0.5rem;
  border-radius: 50px;
  gap: 0.5rem;
  font-size: 1.4rem;
  font-family: 'KoreanHANAB', sans-serif;
`;

const StatChangeCount = styled.div`
  color: #545454;
  font-size: 1.4rem;
  font-family: 'KoreanHANAB', sans-serif;
`;

const StatLabel = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 1rem;
  border-top: 2px solid #e0e0e0;
  font-size: 1.5rem;
  font-family: 'KoreanHANAB', sans-serif;
`;

const AlertsContainer = styled.div`
  grid-column: span 1;
`;

const AlertCard = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 6px 6px rgba(0, 0, 0, 0.3);
`;

const AlertItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  border-right: 2px solid #D5D5D5;
  border-bottom: 2px solid #D5D5D5;

  &:nth-child(2n) {
    border-right: none;
  }

  &:nth-child(3), &:nth-child(4) {
    border-bottom: none;
  }
`;

const AlertContent = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const AlertText = styled.div`
  font-size: 1.2rem;
  font-family: 'KoreanHANAB', sans-serif;
`;

const AlertCount = styled.div`
  font-size: 1.4rem;
  font-family: 'BM DoHyeon', sans-serif;
`;

const ChartContainer = styled.div`
  flex: 2;
  height: 300px;
  border-radius: 20px;
  padding: 1rem;
  overflow: hidden;
  box-shadow: 0 6px 6px rgba(0, 0, 0, 0.3);
  position: relative;
`;

const SummaryContainer = styled.div`
  flex: 1;
  padding: 1rem;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 6px 6px rgba(0, 0, 0, 0.3);
  position: relative;
`;

const SummaryTitle = styled.div`
  font-size: 1.7rem;
  font-family: 'BM DoHyeon', sans-serif;
`;

const SummarySubtitle = styled.div`
  color: #898989;
  font-size: 1.4rem;
  font-family: 'KoreanHANAB', sans-serif;
`;

const SummaryWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 12px;
  padding-bottom: 18px;
`;

const SummaryItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 12px;
  padding-bottom: 10px;
  border-bottom: 2px solid #D5D5D5;
`;

const SummaryLabel = styled.div`
  font-size: 1.3rem;
  font-family: 'KoreanHANAB', sans-serif;
`;

const SummaryValue = styled.div`
  font-size: 1.4rem;
  font-family: 'BM DoHyeon', sans-serif;
`;

const StyledLink = styled(RouterLink)`
  color: #000;
  text-decoration: none;
  font-size: 1.2rem;
  font-family: 'BM DoHyeon', sans-serif;
  padding-bottom: 10px;
  border-bottom: 2px solid #D5D5D5;
`;

const StyledIcon = styled(FontAwesomeIcon)`
  margin-right: 0.5rem;
`;
