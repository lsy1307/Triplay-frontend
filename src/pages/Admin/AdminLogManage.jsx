import React, { useEffect, useRef, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import styled from 'styled-components';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAnglesLeft, faAngleRight, faAnglesRight, faArrowRight } from "@fortawesome/free-solid-svg-icons";
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

const AdminLogManage = () => {
  const [logs, setLogs] = useState([]);
  const [sortOrder, setSortOrder] = useState('createdAt');
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [currentGroup, setCurrentGroup] = useState(0);
  const ITEMS_PER_PAGE = 10;
  const PAGES_PER_GROUP = 5;

  useEffect(() => {
    fetchLogs();
  }, [currentPage, sortOrder]);

  const fetchLogs = async () => {
    try {
      const response = await api.get(`/logs?page=${currentPage}&size=${ITEMS_PER_PAGE}&sortBy=${sortOrder}`);
      console.log('API Response:', response.data);
      if (response.data && response.data.content) {
        setLogs(response.data.content || []);
        setTotalPages(response.data.totalPages || 0);
      } else {
        console.error('Unexpected response structure:', response.data);
        setError('서버에서 예상치 못한 응답을 받았습니다.');
      }
    } catch (error) {
      console.error('Failed to fetch logs:', error);
      setLogs([]);
      setTotalPages(0);
    }
  };

  const handleSort = (order) => {
    setSortOrder(order);
    setCurrentPage(0);
    setCurrentGroup(0);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    setCurrentGroup(Math.floor(newPage / PAGES_PER_GROUP));
  };

  const handleGroupChange = (direction) => {
    const newGroup = direction === 'next' 
      ? Math.min(currentGroup + 1, Math.floor((totalPages - 1) / PAGES_PER_GROUP))
      : Math.max(currentGroup - 1, 0);
    setCurrentGroup(newGroup);
    setCurrentPage(newGroup * PAGES_PER_GROUP);
  };

  const renderPageNumbers = () => {
    const startPage = currentGroup * PAGES_PER_GROUP;
    const endPage = Math.min(startPage + PAGES_PER_GROUP, totalPages);
    
    return Array.from({ length: endPage - startPage }, (_, index) => {
      const pageNumber = startPage + index;
      return (
        <PageNumber 
          key={pageNumber}
          $isActive={currentPage === pageNumber} 
          onClick={() => handlePageChange(pageNumber)}
        >
          {pageNumber + 1}
        </PageNumber>
      );
    });
  };

  return (
    <Container>
      <AdminHeader />
      <ContentContainer>
        <TitleContainer>
          <Title>로그 관리 페이지</Title>
          <TabContainer>
            <StyledLink to='/admin/grafana'>
              <TabText>Grafana 대시보드</TabText>
              <FontAwesomeIcon icon={faArrowRight} size='lg' />
            </StyledLink>
            <StyledLink to='/admin/home'>
              <TabText>관리자 대시보드</TabText>
              <FontAwesomeIcon icon={faArrowRight} size='lg' />
            </StyledLink>
          </TabContainer>
          {/* <TabContainer>
            <Tab>
              <StyledLink to='/admin/grafana'>
                Grafana 대시보드&nbsp;&nbsp;
                <FontAwesomeIcon icon={faArrowRight} size='lg' />
              </StyledLink>
            </Tab>
            <Tab>
              <StyledLink to='/admin/home'>
                관리자 대시보드&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <FontAwesomeIcon icon={faArrowRight} size='lg' />
              </StyledLink>
            </Tab>
          </TabContainer> */}
        </TitleContainer>
        <SubTitle>로그를 조회할 수 있습니다.</SubTitle>
        <MainContent>
          <ActionBar>
            <SortDropdown value={sortOrder} onChange={(e) => handleSort(e.target.value)}>
              <option value="createdAt">날짜순</option>
              <option value="className">클래스명순</option>
              <option value="methodName">메소드명순</option>
              <option value="executionTime">실행시간순</option>
            </SortDropdown>
          </ActionBar>
          {logs && logs.length > 0 ? (
            <>
              <LogTable>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>클래스명</th>
                    <th>메소드명</th>
                    <th>요청 파라미터</th>
                    {/* <th>요청 결과</th> */}
                    <th>실행시간</th>
                    <th>날짜</th>
                  </tr>
                </thead>
                <tbody>
                  {logs.map((log) => (
                    <tr key={log.id} onClick={() => handleRowClick(log.id)}>
                      <td>{log.id}</td>
                      <td>{log.className}</td>
                      <td>{log.methodName}</td>
                      <td>{log.params}</td>
                      {/* <td>{log.result}</td> */}
                      <td>{log.executionTime}</td>
                      <td>{new Date(log.createdAt).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </LogTable>
              <Pagination>
                <PaginationIcon
                  icon={faAnglesLeft}
                  onClick={() => {
                    setCurrentPage(0);
                    setCurrentGroup(0);
                  }}
                />
                <PaginationIcon 
                  icon={faAngleLeft} 
                  onClick={() => {
                    if (currentPage % PAGES_PER_GROUP === 0) {
                      handleGroupChange('prev');
                    } else {
                      handlePageChange(currentPage - 1);
                    }
                  }}
                />
                {renderPageNumbers()}
                <PaginationIcon 
                  icon={faAngleRight} 
                  onClick={() => {
                    if ((currentPage + 1) % PAGES_PER_GROUP === 0) {
                      handleGroupChange('next');
                    } else if (currentPage < totalPages - 1) {
                      handlePageChange(currentPage + 1);
                    }
                  }}
                />
                <PaginationIcon 
                  icon={faAnglesRight} 
                  onClick={() => {
                    const lastGroup = Math.floor((totalPages - 1) / PAGES_PER_GROUP);
                    setCurrentGroup(lastGroup);
                    setCurrentPage(totalPages - 1);
                  }}
                />
              </Pagination>
            </>
          ) : (
            <NoLogMessage>아직 등록된 로그가 없습니다.</NoLogMessage>
          )}
        </MainContent>
      </ContentContainer>
    </Container>
  );
};

export default AdminLogManage;

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

const ActionBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const SortDropdown = styled.select`
  width: 10rem;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 3px;
  font-size: 1rem;
  font-family: 'BM DoHyeon', sans-serif;
`;

const LogTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 1rem;

  th, td {
    padding: 1rem 0;
    padding-left: 2rem;
    text-align: left;
    font-size: 1.2rem;
  }

  th {
    background-color: #E0E0E0;
    color: #898989;
    font-family: 'KoreanHANAL', sans-serif;
  }

  td {
    border-bottom: 1px solid #999;
    font-family: 'KoreanHANAB', sans-serif;
  }

  th:first-child,
  td:first-child {
    padding-left: 1.5rem;
    color: #898989;
  }

  th:last-child,
  td:last-child {
    padding-right: 1.5rem;
  }

  tbody tr {
    &:hover {
      background-color: #f5f5f5;
    }
  }
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1.5rem;
  gap: 1.5rem;
`;

const PaginationIcon = styled(FontAwesomeIcon)`
  font-size: 1rem;
  cursor: pointer;
  margin: 0 0.5rem;
`;

const PageNumber = styled.button`
  background-color: ${props => props.$isActive ? '#B0EB75' : '#FFFFFF'};
  color: ${props => props.$isActive ? '#FFFFFF' : '#000000'};
  border: none;
  border-radius: 33px;
  width: 40px;
  height: 40px;
  font-size: 1rem;
  font-family: 'BM DoHyeon', sans-serif;
  cursor: pointer;

  &:hover {
    background-color: ${props => props.$isActive ? '#B0EB75' : '#F5F5F5'};
  }
`;

const NoLogMessage = styled.div`
  padding: 1rem;
  text-align: center;
  border: 1px solid #D5D5D5;
  border-radius: 5px;
  font-size: 1.2rem;
  font-family: 'KoreanHANAL', sans-serif;
`;

