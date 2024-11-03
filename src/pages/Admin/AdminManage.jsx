import React, { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAnglesLeft, faAngleRight, faAnglesRight, faArrowRight, faMap, faUser, faGamepad, faEarthAsia, faFilm, faComments, faBell } from "@fortawesome/free-solid-svg-icons";
import AdminHeader from '../../layout/AdminHeader';
import Branding from '../../assets/svgs/branding.svg';

const AdminManage = () => {
  const navigate = useNavigate();
  const [activePage, setActivePage] = useState(1);

  const tabsPage1 = [
    { icon: faUser, text: "회원 관리", link: "/admin/manage/user" },
    { icon: faFilm, text: "클립 관리", link: "/admin/manage/clip" },
    { icon: faComments, text: "포스트 관리", link: "/admin/manage/post" },
    { icon: faBell, text: "공지사항 관리", link: "/admin/manage/notice" },
  ];

  const tabsPage2 = [
    { icon: faMap, text: "여행 일정 관리", link: "/admin/manage/trip" },
    // { icon: faGamepad, text: "게임 관리", link: "/admin/manage/game" },
    // { icon: faEarthAsia, text: "취미 관리", link: "/admin/manage/hobby" },
  ];
  
  const currentTabs = activePage === 1 ? tabsPage1 : tabsPage2;

  const handleTabClick = (link) => {
    navigate(link);
  };

  return (
    <Container>
      <AdminHeader />
      <ContentContainer>
        <TitleContainer>
          <Title>관리자 페이지</Title>
          <StyledLink to='/admin/home'>
            관리자 대시보드&nbsp;&nbsp;
            <FontAwesomeIcon icon={faArrowRight} size='lg' />
          </StyledLink>
        </TitleContainer>
        <MainContent>
          <LeftSection>
            <TabsContainer>
              <TabTitle>
                Tabs
              </TabTitle>
              {currentTabs.map((tab, index) => (
                <Tab key={index} onClick={() => handleTabClick(tab.link)}>
                  <TabIcon icon={tab.icon} />
                  {tab.text}
                  <ArrowIcon icon={faArrowRight} />
                </Tab>
              ))}
            </TabsContainer>
            <Pagination>
              <PaginationIcon icon={faAnglesLeft} onClick={() => setActivePage(1)} />
              <PaginationIcon icon={faAngleLeft} onClick={() => setActivePage(prev => Math.max(prev - 1, 1))} />
              <PageNumber $isActive={activePage === 1} onClick={() => setActivePage(1)}>1</PageNumber>
              <PageNumber $isActive={activePage === 2} onClick={() => setActivePage(2)}>2</PageNumber>
              <PaginationIcon icon={faAngleRight} onClick={() => setActivePage(prev => Math.min(prev + 1, 2))} />
              <PaginationIcon icon={faAnglesRight} onClick={() => setActivePage(2)} />
            </Pagination>
          </LeftSection>
          <RightSection>
            <SloganWrapper>
              <Slogan src={Branding} alt="Branding Image" />
            </SloganWrapper>
          </RightSection>
        </MainContent>
      </ContentContainer>
    </Container>
  );
};

export default AdminManage;

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
  font-family: 'KoreanHANAB', sans-serif;
`;

const MainContent = styled.div`
  display: flex;
  gap: 2rem;
`;

const LeftSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const RightSection = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TabsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const TabIcon = styled(FontAwesomeIcon)`
  width: 2rem;
`;

const TabTitle = styled.div`
  color: #D5D5D5;
  padding: 0.8rem 0;
  border-bottom: 2px solid #D5D5D5;
  font-size: 1.5rem;
  font-family: 'BM DoHyeon', sans-serif;
`;

const Tab = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.9rem 0;
  border-bottom: 2px solid #D5D5D5;
  font-size: 1.5rem;
  font-family: 'BM DoHyeon', sans-serif;
  cursor: pointer;
`;

const ArrowIcon = styled(FontAwesomeIcon)`
  margin-left: auto;
`;

const SloganWrapper = styled.div`
  width: 80%; // 슬로건의 최대 너비를 제한
  max-width: 456px; // 슬로건의 최대 크기 설정
  min-width: 200px; // 슬로건의 최소 크기 설정
`;

const Slogan = styled.img`
  width: 100%;
  height: auto;
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1.5rem;
  gap: 1.5rem;
`;

const PaginationIcon = styled(FontAwesomeIcon)`
  font-size: 2rem;
  cursor: pointer;
  margin: 0 0.5rem;
`;

const PageNumber = styled.button`
  background-color: ${props => props.$isActive ? '#B0EB75' : '#FFFFFF'};
  color: ${props => props.$isActive ? '#FFFFFF' : '#000000'};
  border: none;
  border-radius: 33px;
  width: 50px;
  height: 50px;
  font-size: 1.5rem;
  font-family: 'BM DoHyeon', sans-serif;
  cursor: pointer;

  &:hover {
    background-color: ${props => props.$isActive ? '#B0EB75' : '#F5F5F5'};
  }
`;

const StyledLink = styled(RouterLink)`
  color: #000000;
  text-decoration: none;
  font-size: 1.2rem;
  font-family: 'BM DoHyeon', sans-serif;
  padding-bottom: 10px;
  border-bottom: 2px solid #D5D5D5;
`;