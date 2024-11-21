import { Link as RouterLink } from 'react-router-dom';
import styled from 'styled-components';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import AdminHeader from '../../layout/AdminHeader';
import axios from 'axios';

const api = axios.create({
  baseURL: `${import.meta.env.VITE_BASE_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const AdminGrafanaManage = () => {
  return (
    <Container>
      <AdminHeader />
      <ContentContainer>
        <TitleContainer>
          <Title>Grafana 페이지</Title>
          <TabContainer>
            <StyledLink to='/admin/home'>
              <TabText>관리자 대시보드</TabText>
              <FontAwesomeIcon icon={faArrowRight} size='lg' />
            </StyledLink>
          </TabContainer>
        </TitleContainer>
        <SubTitle>다양한 로그를 모니터링할 수 있습니다.</SubTitle>
        <DashboardContainer>
          <GrafanaIframe
            src="https://localhost:3000/d/fe4gj27hsqigwf/jvm-micrometer?orgId=1&from=now-24h&to=now&timezone=browser&var-application=triplay&var-instance=host.docker.internal:8443&var-jvm_memory_pool_heap=$__all&var-jvm_memory_pool_nonheap=$__all&var-jvm_buffer_pool=$__all&refresh=30s&kiosk"
          />
        </DashboardContainer>
      </ContentContainer>
    </Container>
  );
};

export default AdminGrafanaManage;

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
  margin-bottom: 3rem;
`;

const Title = styled.h1`
  font-size: 1.7rem;
  font-family: 'KoreanHANAB', sans-serif;
`;

const SubTitle = styled.h2`
  margin-bottom: 2rem;
  font-size: 1.3rem;
  font-family: 'KoreanHANAL', sans-serif;
`;

const TabContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px; // 탭 사이의 간격
`;

const TabText = styled.span`
  margin-right: 12px; // 텍스트와 아이콘 사이의 간격
`;

const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const StyledLink = styled(RouterLink)`
  display: flex;
  align-items: center;
  text-decoration: none;  
  color: #000000;
  font-size: 1.2rem;
  font-family: 'BM DoHyeon', sans-serif;
  padding: 5px 0;
  border-bottom: 2px solid #D5D5D5;
  transition: all 0.2s ease-in-out;

  &:hover {
    border-bottom-color: #B0EB75;
  }
`;

const DashboardContainer = styled.div`
  width: 100%;
  height: calc(100vh - 250px); // 헤더와 타이틀 영역을 제외한 높이
  background-color: #f5f5f5;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

const GrafanaIframe = styled.iframe`
  width: 100%;
  height: 100%;
  border: none;
`;