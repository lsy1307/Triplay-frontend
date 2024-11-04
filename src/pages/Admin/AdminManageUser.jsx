import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import styled from 'styled-components';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAnglesLeft, faAngleRight, faAnglesRight, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import AdminHeader from '../../layout/AdminHeader';
import axios from 'axios';

const ConfirmModal = ({ isOpen, onClose, onConfirm, action, userId }) => {
  if (!isOpen) return null;

  const actionText = action === 'suspend' ? '정지' : '정지 해제';
  const message = action === 'suspend' 
    ? `해당 회원을 정지합니다. 정지하시겠습니까?`
    : `해당 회원의 정지를 해제합니다. 해제하시겠습니까?`;

  return (
    <ModalOverlay onClick={onClose}>
      <ConfirmContent onClick={e => e.stopPropagation()}>
        <h2>회원 {actionText}</h2>
        <p>{message}</p>
        <ConfirmButtons>
          <ConfirmButton onClick={onClose}>취소</ConfirmButton>
          <ConfirmButton $primary onClick={() => onConfirm(userId, action)}>{actionText}</ConfirmButton>
        </ConfirmButtons>
      </ConfirmContent>
    </ModalOverlay>
  );
};

const api = axios.create({
  baseURL: `${import.meta.env.VITE_BASE_URL}/admin`,
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

const AdminManageUser = () => {
  const [users, setUsers] = useState([]);
  const [sortOrder, setSortOrder] = useState('firedAt'); // 정지 일자 기준
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [selectedAction, setSelectedAction] = useState(null);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [error, setError] = useState(null);
  
  const ITEMS_PER_PAGE = 5;

  useEffect(() => {
    fetchUsers();
  }, [currentPage, sortOrder]);

  const formatDate = (date) => {
    if (!date) return '';
    const d = new Date(date);
    return `${d.getFullYear()}. ${String(d.getMonth() + 1).padStart(2, '0')}. ${String(d.getDate()).padStart(2, '0')}`;
  };

  const fetchUsers = async () => {
    try {
      const response = await api.get(`/user?page=${currentPage}&size=${ITEMS_PER_PAGE}&sortBy=${sortOrder}`);
      // console.log('API Response:', response.data);
      if (response.data && response.data.content) {
        setUsers(response.data.content.map(user => ({
          ...user,
          firedAt: user.firedAt ? formatDate(user.firedAt) : null
        })));
        setTotalPages(response.data.totalPages);
      } else {
        console.error('Unexpected response structure:', response.data);
        setError('서버에서 예상치 못한 응답을 받았습니다.');
      }
    } catch (error) {
      console.error('회원 목록을 불러오는데 실패했습니다:', error);
      setUsers([]);
      setTotalPages(0);
      setError('회원 목록을 불러오는데 실패했습니다. 다시 시도해 주세요.');
    }
  };

  const handleSort = (order) => {
    setSortOrder(order);
    setCurrentPage(0);
  };

  const handleAction = (userId, action) => {
    setSelectedUserId(userId);
    setSelectedAction(action);
    setConfirmModalOpen(true);
  };

  const handleConfirm = async (userId, action) => {
    try {
      const fired = action === 'suspend';
      const response = await api.post(`/user/${userId}/status`, { fired });
      
      if (response.status === 200) {
        setUsers(users.map(user => 
          user.id === userId
            ? { 
                ...user, 
                fired: fired, 
                firedAt: fired ? formatDate(new Date()) : null 
              }
            : user
        ));
      }
    } catch (error) {
      console.error(`회원 상태 변경에 실패했습니다:`, error);
      setError(`회원 상태 변경 중 오류가 발생했습니다: ${error.message}`);
    }
    setConfirmModalOpen(false);
  };

  return (
    <Container>
      <AdminHeader />
      <ContentContainer>
        <TitleContainer>
          <Title>회원 관리 페이지</Title>
          <StyledLink to='/admin/manage'>
            관리자 페이지&nbsp;&nbsp;
            <FontAwesomeIcon icon={faArrowRight} size='lg' />
          </StyledLink>
        </TitleContainer>
        <SubTitle>회원 정지와 회원 정지 해제를 할 수 있습니다.</SubTitle>
        <MainContent>
          {error && <ErrorMessage>{error}</ErrorMessage>}
          {users.length > 0 ? (
            <>
              <SortDropdown value={sortOrder} onChange={(e) => handleSort(e.target.value)}>
                <option value="firedAt">정지일순</option>
                <option value="email">이메일순</option>
              </SortDropdown>
              <UserList>
                {users.map((user) => (
                  <UserItem key={user.id}>
                    <UserId>{user.email}</UserId>
                    {/* <UserPreference preference={user.preferences[0]}>{user.preferences[0]}</UserPreference> */}
                    {user.firedAt && <ReportDate>{user.firedAt}</ReportDate>}
                    {!user.fired ? (
                      <ActionButton onClick={() => handleAction(user.id, 'suspend')}>정지</ActionButton>
                    ) : (
                      <ActionButton onClick={() => handleAction(user.id, 'unsuspend')}>정지 해제</ActionButton>
                    )}
                  </UserItem>
                ))}
              </UserList>
              <Pagination>
                <PaginationIcon
                  icon={faAnglesLeft}
                  onClick={() => setCurrentPage(0)}
                />
                <PaginationIcon
                  icon={faAngleLeft}
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 0))}
                />
                {[...Array(totalPages)].map((_, index) => (
                  <PageNumber 
                    key={index} 
                    $isActive={currentPage === index} 
                    onClick={() => setCurrentPage(index)}
                  >
                    {index + 1}
                  </PageNumber>
                ))}
                <PaginationIcon
                  icon={faAngleRight}
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages - 1))}
                />
                <PaginationIcon
                  icon={faAnglesRight}
                  onClick={() => setCurrentPage(totalPages - 1)}
                />
              </Pagination>
            </>
          ) : (
            <NoUserMessage>아직 가입한 회원이 없습니다.</NoUserMessage>
          )}
        </MainContent>
      </ContentContainer>
      <ConfirmModal 
        isOpen={confirmModalOpen}
        onClose={() => setConfirmModalOpen(false)}
        onConfirm={handleConfirm}
        action={selectedAction}
        userId={selectedUserId}
      />
    </Container>
  );
};

export default AdminManageUser;

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

const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const StyledLink = styled(RouterLink)`
  color: #000000;
  text-decoration: none;
  font-size: 1.2rem;
  font-family: 'BM DoHyeon', sans-serif;
  padding-bottom: 10px;
  border-bottom: 2px solid #D5D5D5;
`;

const SortDropdown = styled.select`
  align-self: flex-end;
  padding: 0.5rem;
  font-family: 'BM DoHyeon', sans-serif;
`;

const UserList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const UserItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 0;
  gap: 1.5rem;
  border-bottom: 1px solid #D5D5D5;
`;

const UserId = styled.span`
  flex: auto;
  font-size: 1.3rem;
  font-family: 'KoreanHANAB', sans-serif;
`;

const UserPreference = styled.span`
  padding: 0.5rem 1rem;
  border-radius: 50px;
  background-color: ${props => 
    props.preference === '액티비티' ? '#1A5319' : 
    props.preference === '휴양' ? '#80AF81' : '#508D4E'};
  color: white;
  font-size: 1rem;
  font-family: 'KoreanHANAB', sans-serif;
`;

const ReportDate = styled.span`
  color: #909090;
  font-size: 1rem;
  font-family: 'KoreanHANAB', sans-serif;
`;

const ActionButton = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 5px;
  background-color: #000000;
  color: white;
  cursor: pointer;
  font-size: 1rem;
  font-family: 'KoreanHANAB', sans-serif;
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

const NoUserMessage = styled.div`
  padding: 1rem;
  text-align: center;
  border: 1px solid #D5D5D5;
  border-radius: 5px;
  font-size: 1.2rem;
  font-family: 'KoreanHANAL', sans-serif;
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ConfirmContent = styled.div`
  background-color: white;
  padding: 2rem;
  border-radius: 30px;
  width: 100%;
  max-width: 400px;
  text-align: center;

  h2 {
    margin-bottom: 0.8rem;
    font-size: 1.5rem;
    font-family: 'KoreanJJPPB', sans-serif;
  }

  p {
    margin-bottom: 2rem;
    font-size: 1.2rem;
    font-family: 'KoreanJJPPM', sans-serif;
  }
`;

const ConfirmButtons = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
`;

const ConfirmButton = styled.button`
  width: 45%;
  padding: 8px 16px;
  border: none;
  border-radius: 20px;
  font-size: 1.3rem;
  font-family: 'KoreanJJPPM', sans-serif;
  cursor: pointer;
  background-color: ${props => props.$primary ? '#B0EB75' : '#f0f0f0'};
  color: ${props => props.$primary ? 'white' : 'black'};
`;

const ErrorMessage = styled.div`
  color: red;
  margin-bottom: 1rem;
  font-size: 1rem;
  font-family: 'KoreanHANAL', sans-serif;
`;