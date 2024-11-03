import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import styled from 'styled-components';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAnglesLeft, faAngleRight, faAnglesRight, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import AdminHeader from '../../layout/AdminHeader';

const ConfirmModal = ({ isOpen, onClose, onConfirm, report }) => {
  if (!isOpen || !report) return null;

  const actionText = report.type === 'post' ? '포스트 삭제' : '댓글 삭제';
  const message = report.type === 'post'
    ? `해당 사용자의 포스트가 삭제됩니다. 삭제하시겠습니까?`
    : `해당 사용자의 댓글이 삭제됩니다. 삭제하시겠습니까?`;

  return (
    <ModalOverlay onClick={onClose}>
      <ConfirmContent onClick={e => e.stopPropagation()}>
        <h2>{actionText}</h2>
        <p>{message}</p>
        <ConfirmButtons>
          <ConfirmButton onClick={onClose}>취소</ConfirmButton>
          <ConfirmButton $primary onClick={() => onConfirm(report)}>삭제</ConfirmButton>
        </ConfirmButtons>
      </ConfirmContent>
    </ModalOverlay>
  );
};

// 급하게 MVP 모델을 작성하기 위해 더미 값으로 대체함
const UserItem = ({ user = {}, onClick }) => (
  <UserItemContainer onClick={() => onClick(user)}>
    <UserId>{user.userId || 'Unknown User'}</UserId>
    <ReportCount>신고된 포스트 수: 2</ReportCount>
    <ReportCount>신고된 댓글 수: 1</ReportCount>
    <ReportDate>2024. 10. 15.</ReportDate>
    <ActionIcon>
      <FontAwesomeIcon icon={faArrowRight} />
    </ActionIcon>
  </UserItemContainer>
);

const UserList = ({ users = [], onUserClick }) => (
  <UserListContainer>
    {users.length > 0 ? (
      users.map((user, index) => (
        <UserItem 
          key={user.userId || index} 
          user={user} 
          onClick={onUserClick}
        />
      ))
    ) : (
      <NoUserMessage>신고된 포스트나 포스트 댓글이 없습니다.</NoUserMessage>
    )}
  </UserListContainer>
);

// const UserList = ({ users, onUserClick }) => (
//   <UserListContainer>
//     {users.map((user) => (
//       <UserItem key={user.userId} user={user} onClick={onUserClick} />
//     ))}
//   </UserListContainer>
// );

const ReportList = ({ reports, onDelete }) => (
  <ReportListContainer>
    {reports.map((report) => (
      <ReportItem key={report.id}>
        <ReportInfo>
          <ReportType type={report.type}>{report.type === 'post' ? '포스트' : '댓글'}</ReportType>
          <ReportTitle>{truncateText(report.title || report.content, 30)}</ReportTitle>
        </ReportInfo>
        <ReportDate>{report.reportDate}</ReportDate>
        <DeleteButton onClick={() => onDelete(report)}>삭제</DeleteButton>
      </ReportItem>
    ))}
  </ReportListContainer>
);

const truncateText = (text, maxLength) => {
  return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
};

// 관리자 포스트 관리 뷰
const AdminManagePost = () => {
  const [users, setUsers] = useState([]);
  const [sortOrder, setSortOrder] = useState('전체');
  const [currentPage, setCurrentPage] = useState(1);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const usersPerPage = 5;

  const tempUsers = [
    { 
      userId: 'dipleinelven@naver.com', 
      reports: [
        { id: 1, type: 'post', title: '미안하다 이거 보여주려고 어그로끌었다...', content: '나루토 사스케 싸움수준 ㄹㅇ실화냐? 진짜 세계관최강자들의 싸움이다'},
        { id: 2, type: 'post', title: '나루토 사스케 싸움수준 ㄹㅇ실화냐?', content: '진짜 세계관최강자들의 싸움이다'},
        { id: 3, type: 'comment', content: '와 개쩐다 진짜 세계관 최강자들의 싸움이다'},
      ]
    }
  ];

  useEffect(() => {
    setUsers(tempUsers);
  }, []);

  const handleSort = (order) => {
    setSortOrder(order);
    // 정렬 로직 구현
  };

  const handleUserClick = (user) => {
    setSelectedUser(user);
  };

  const handleDelete = (report) => {
    setSelectedReport(report);
    setConfirmModalOpen(true);
  };

  const confirmDelete = (report) => {
    setUsers(prevUsers => {
      const updatedUsers = prevUsers.map(user => {
        if (user.userId === selectedUser.userId) {
          return {
            ...user,
            reports: user.reports.filter(r => r.id !== report.id)
          };
        }
        return user;
      });
      
      // Update selectedUser
      const updatedSelectedUser = updatedUsers.find(user => user.userId === selectedUser.userId);
      setSelectedUser(updatedSelectedUser);

      return updatedUsers;
    });
    setConfirmModalOpen(false);
    setSelectedReport(null);
  };

  const handleBack = () => {
    setSelectedUser(null);
  };

  // Pagination
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(users.length / usersPerPage);

  const hasReports = users.some(user => user.reports.length > 0);

  return (
    <Container>
      <AdminHeader />
      <ContentContainer>
        <TitleContainer>
          <Title>포스트 관리 페이지</Title>
          <StyledLink to='/admin/manage'>
            관리자 페이지&nbsp;&nbsp;
            <FontAwesomeIcon icon={faArrowRight} size='lg' />
          </StyledLink>
        </TitleContainer>
        <SubTitle>신고 접수된 포스트, 포스트 댓글 확인 및 삭제를 할 수 있습니다.</SubTitle>
        <MainContent>
          {!hasReports ? (
            <NoPostMessage>아직 신고 접수된 포스트나 댓글이 없습니다.</NoPostMessage>
          ) : !selectedUser ? (
            <>
              <SortDropdown value={sortOrder} onChange={(e) => handleSort(e.target.value)}>
                <option value="전체">전체</option>
                <option value="취향">취향</option>
              </SortDropdown>
              <UserList users={currentUsers} onUserClick={handleUserClick} />
              <Pagination>
                <PaginationIcon icon={faAnglesLeft} onClick={() => setCurrentPage(1)} />
                <PaginationIcon icon={faAngleLeft} onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} />
                {[...Array(totalPages)].map((_, index) => (
                  <PageNumber 
                    key={index} 
                    $isActive={currentPage === index + 1} 
                    onClick={() => setCurrentPage(index + 1)}
                  >
                    {index + 1}
                  </PageNumber>
                ))}
                <PaginationIcon icon={faAngleRight} onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} />
                <PaginationIcon icon={faAnglesRight} onClick={() => setCurrentPage(totalPages)} />
              </Pagination>
            </>
          ) : (
            <>
              <BackButton onClick={handleBack}>
                <FontAwesomeIcon icon={faAngleLeft} /> 뒤로
              </BackButton>
              {selectedUser.reports.length > 0 ? (
                <ReportList reports={selectedUser.reports} onDelete={handleDelete} />
              ) : (
                <NoPostMessage>이 사용자의 신고된 포스트나 댓글이 없습니다.</NoPostMessage>
              )}
            </>
          )}
        </MainContent>
      </ContentContainer>
      <ConfirmModal 
        isOpen={confirmModalOpen}
        onClose={() => setConfirmModalOpen(false)}
        onConfirm={confirmDelete}
        report={selectedReport}
      />
    </Container>
  );
};

export default AdminManagePost;

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

const UserListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ReportListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const UserItemContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 0;
  border-bottom: 1px solid #D5D5D5;
  gap: 1.5rem;
  cursor: pointer;
  &:hover {
    background-color: #f5f5f5;
  }
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

const ReportCount = styled.span`
  padding: 0.5rem 1rem;
  border-radius: 50px;
  background-color: #ff0000;
  color: white;
  font-size: 1.2rem;
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

const NoPostMessage = styled.div`
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

//
const ActionIcon = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.2rem;
`;

const DetailContainer = styled.div`
  display: flex;
  gap: 2rem;
`;

const DetailLeft = styled.div`
  flex: 1;
`;

const DetailRight = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ShowContentButton = styled.button`
  background: none;
  border: none;
  font-size: 2rem;
  cursor: pointer;
`;

const ContentArea = styled.div`
  width: 100%;
  height: 300px;
  border: 1px solid #ddd;
  padding: 1rem;
  margin-bottom: 1rem;
`;

const Content = styled.img`
  width: 100%;
  height: 100px;
`;

const DetailButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
`;

const CancelButton = styled.button`
  padding: 0.5rem 1rem;
  margin-right: 1rem;
  background-color: #f0f0f0;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const DeleteButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: #000000;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 0.9rem;
  font-family: 'KoreanHANAB', sans-serif;
`;

const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.2rem;
  font-family: 'KoreanHANAB', sans-serif;
  color: #000;
  margin-bottom: 1rem;
`;

const ReportItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 0;
  gap: 1.5rem;
  border-bottom: 1px solid #D5D5D5;
  &:hover {
    background-color: #f5f5f5;
  }
`;

const ReportInfo = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const ReportType = styled.span`
  padding: 0.2rem 0.5rem;
  border-radius: 50px;
  background-color: ${props => props.type === 'post' ? '#1A5319' : '#80AF81'};
  color: white;
  font-size: 0.8rem;
  font-family: 'KoreanHANAB', sans-serif;
`;

const ReportTitle = styled.span`
  font-size: 1rem;
  font-family: 'KoreanHANAL', sans-serif;
`;
