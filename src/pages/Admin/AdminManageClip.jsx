import React, { useCallback, useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import styled from 'styled-components';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAnglesLeft, faAngleRight, faAnglesRight, faArrowRight, faPlay, faPause } from "@fortawesome/free-solid-svg-icons";
import AdminHeader from '../../layout/AdminHeader';
import VideoThumbnail from './VideoThumnail';
import ReactPlayer from 'react-player';
import axios from 'axios';

const ConfirmModal = ({ isOpen, onClose, onConfirm, clip }) => {
  if (!isOpen || !clip) return null;

  return (
    <ModalOverlay onClick={onClose}>
      <ConfirmContent onClick={e => e.stopPropagation()}>
        <h2>클립 삭제</h2>
        <p>해당 클립이 삭제됩니다. 삭제하시겠습니까?</p>
        <ConfirmButtons>
          <ConfirmButton onClick={onClose}>취소</ConfirmButton>
          <ConfirmButton $primary onClick={() => onConfirm(clip)}>삭제</ConfirmButton>
        </ConfirmButtons>
      </ConfirmContent>
    </ModalOverlay>
  );
};

const UserItem = ({ user = {}, onClick }) => (
  <UserItemContainer onClick={() => onClick(user)}>
    <UserId>{user.userId || 'Unknown User'}</UserId>
    <ReportCount>신고된 클립 수: {user.clipIds ? user.clipIds.length : 0}</ReportCount>
    <ReportDate>
      {user.clipReportedAt
        ? new Date(user.clipReportedAt).toLocaleDateString()
        : null}
    </ReportDate>
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
      <NoUserMessage>신고된 클립이 없습니다.</NoUserMessage>
    )}
  </UserListContainer>
);

const ClipThumbnail = ({ clip, onClick, isReported }) => {
  console.log('ClipThumbnail received clip:', clip);

  return (
    <ThumbnailContainer onClick={() => onClick(clip)} $isReported={isReported}>
      <VideoThumbnail videoUrl={clip.clipUrl} alt={clip.clipTitle} />
      <ClipTitle>{clip.clipTitle}</ClipTitle>
    </ThumbnailContainer>
  );
};

const ClipList = ({ clips, onClipClick }) => {
  console.log('ClipList received clips:', clips);

  return (
    <ClipListContainer>
      <ClipListTitle>신고된 클립</ClipListTitle>
      <ThumbnailGrid>
        {clips && clips.length > 0 ? (
          clips.map((clip, index) => {
            console.log(`Rendering clip ${index}:`, clip);
            return (
              <ClipThumbnail 
                key={clip.clipId} 
                clip={clip} 
                onClick={() => onClipClick(clip)}
                isReported={true}
              />
            );
          })
        ) : (
          <NoClipMessage>아직 신고 접수된 클립이 없습니다.</NoClipMessage>
        )}
      </ThumbnailGrid>
    </ClipListContainer>
  );
};

const ClipDetail = ({ clip, onClose, onDelete }) => {
  const [playing, setPlaying] = useState(false);
  const [showControls, setShowControls] = useState(false);

  const togglePlay = useCallback(() => {
    setPlaying(prev => !prev);
  }, []);

  const handleMouseEnter = useCallback(() => {
    setShowControls(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setShowControls(false);
  }, []);

  if (!clip) {
    return <NoClipSelectedMessage>클립을 선택해주세요.</NoClipSelectedMessage>;
  }

  return (
    <ClipDetailContainer>
      <ClipPlayerWrapper
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <StyledReactPlayer
          playing={playing}
          url={clip.clipUrl}
          width="100%"
          height="100%"
          controls={false}
        />
        {showControls && (
          <PlayerOverlay onClick={togglePlay}>
            <PlayPauseIcon icon={playing ? faPause : faPlay} />
          </PlayerOverlay>
        )}
      </ClipPlayerWrapper>
    </ClipDetailContainer>
  );
};

const api = axios.create({
  baseURL: `${import.meta.env.VITE_BASE_URL}/admin/clip`,
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

// 관리자 클립 관리 뷰
const AdminManageClip = () => {
  const [users, setUsers] = useState([]);
  const [sortOrder, setSortOrder] = useState('clipReportedAt');
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [selectedClip, setSelectedClip] = useState(null);
  const [selectedClips, setSelectedClips] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [error, setError] = useState(null);

  const ITEMS_PER_PAGE = 5;

  useEffect(() => {
    fetchUsers();
  }, [currentPage, sortOrder]);

  const fetchUsers = async () => {
    try {
      const response = await api.get(`/reported?page=${currentPage}&size=${ITEMS_PER_PAGE}&sortBy=${sortOrder}`);
      console.log('Server response:', response.data);
      if (response.data && response.data.content) {
        const formattedUsers = response.data.content.map(user => ({
          userId: user.email,
          clipIds: user.clipIds,
          clipTitles: user.clipTitles,
          clipUrls: user.clipUrls,
          clipReportedAt: user.clipReportedAt,
          reportedClips: user.reportedClips
        }));
        setUsers(formattedUsers);
        console.log('Fetched user data:', formattedUsers);
        setTotalPages(response.data.totalPages || 1);
      } else {
        console.error('Unexpected response structure:', response.data);
        setError('서버에서 예상치 못한 응답을 받았습니다.');
      }
    } catch (error) {
      console.error('신고된 클립 목록을 불러오는데 실패했습니다:', error);
      setUsers([]);
      setTotalPages(0);
      setError(`신고된 클립 목록을 불러오는데 실패했습니다: ${error.message}`);
    }
  };

  const handleSort = (order) => {
    setSortOrder(order);
    setCurrentPage(0);
  };

  const handleUserClick = async (user) => {
    console.log('handleUserClick received user:', user);
    setSelectedUser(user);
    if (user && user.clipIds && user.clipIds.length > 0) {
      const clipsData = user.clipIds.map((clipId, index) => ({
        clipId: clipId,
        clipTitle: user.clipTitles[index],
        clipUrl: user.clipUrls[index]
      }));
      console.log('Prepared clipsData:', clipsData);
      setSelectedClips(clipsData);
    } else {
      setSelectedClips([]);
    }
  };

  const handleClipClick = (clip) => {
    console.log('Selected clip: ', clip)
    setSelectedClip(clip);
  };

  const handleDelete = () => {
    if (selectedClip) {
      setConfirmModalOpen(true);
    }
  };

  const confirmDelete = async () => {
    try {
      console.log('Selected clip for deletion:', selectedClip);
      if (!selectedClip || !selectedClip.clipId) {
        console.error('Invalid clip ID');
        setError('유효하지 않은 클립 ID입니다.');
        console.log('selectedClip.clipId:', selectedClip ? selectedClip.clipId : 'undefined');
        return;
      }
      
      const token = localStorage.getItem('token');
      await api.delete(`/${selectedClip.clipId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      // 삭제된 클립을 selectedClips에서 제거
      setSelectedClips(prevClips => prevClips.filter(clip => clip.clipId !== selectedClip.clipId));
      
      // users 상태 업데이트
      setUsers(prevUsers => {
        return prevUsers.map(user => {
          if (user.clipIds.includes(selectedClip.clipId)) {
            return {
              ...user,
              clipIds: user.clipIds.filter(id => id !== selectedClip.clipId),
              clipTitles: user.clipTitles.filter((_, index) => user.clipIds[index] !== selectedClip.clipId),
              clipUrls: user.clipUrls.filter((_, index) => user.clipIds[index] !== selectedClip.clipId)
            };
          }
          return user;
        }).filter(user => user.clipIds.length > 0); // 클립이 없는 사용자 제거
      });

      setConfirmModalOpen(false);
      setSelectedClip(null);
      
      // 모든 클립이 삭제되었는지 확인
      if (selectedClips.length === 1) {
        setSelectedUser(null);
      }
    } catch (error) {
      console.error('클립 삭제 중 오류 발생:', error.response ? error.response.data : error.message);
      setError('클립 삭제 중 오류가 발생했습니다. 다시 시도해 주세요.');
    }
  };

  const handleBack = () => {
    setSelectedUser(null);
    setSelectedClip(null);
  };

  return (
    <Container>
      <AdminHeader />
      <ContentContainer>
        <TitleContainer>
          <Title>클립 관리 페이지</Title>
          <StyledLink to='/admin/manage'>
            관리자 페이지&nbsp;&nbsp;
            <FontAwesomeIcon icon={faArrowRight} size='lg' />
          </StyledLink>
        </TitleContainer>
        <SubTitle>신고 접수된 클립 확인 및 삭제를 할 수 있습니다.</SubTitle>
        <MainContent>
          {error && <ErrorMessage>{error}</ErrorMessage>}
          {users.length === 0 ? (
            <NoClipMessage>아직 신고 접수된 클립이 없습니다.</NoClipMessage>
          ) : !selectedUser ? (
            <>
              <SortDropdown value={sortOrder} onChange={(e) => handleSort(e.target.value)}>
                <option value="clipReportedAt">신고일순</option>
                <option value="email">이메일순</option>
              </SortDropdown>
              <UserList users={users} onUserClick={handleUserClick} />
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
            <>
              <BackButton onClick={handleBack}>
                <FontAwesomeIcon icon={faAngleLeft} /> 뒤로
              </BackButton>
              <ClipManagementContainer>
                {selectedClips.length > 0 ? (
                  <>
                    <ClipList 
                      clips={selectedClips} 
                      onClipClick={handleClipClick} 
                    />
                    <ClipDetailSection>
                      {selectedClip ? (
                        <>
                          <ClipDetail clip={selectedClip} />
                          <ClipActionButtons>
                            <CancelButton onClick={() => setSelectedClip(null)}>취소</CancelButton>
                            <DeleteButton onClick={handleDelete}>클립 삭제</DeleteButton>
                          </ClipActionButtons>
                        </>
                      ) : (
                        <NoClipSelectedMessage>클립을 선택해주세요.</NoClipSelectedMessage>
                      )}
                    </ClipDetailSection>
                  </>
                ) : (
                  <NoClipMessage>이 사용자의 모든 신고된 클립이 삭제되었습니다.</NoClipMessage>
                )}
              </ClipManagementContainer>
            </>
          )}
        </MainContent>
      </ContentContainer>
      <ConfirmModal 
        isOpen={confirmModalOpen}
        onClose={() => setConfirmModalOpen(false)}
        onConfirm={() => confirmDelete()}
        clip={selectedClip}
      />
    </Container>
  );
};

export default AdminManageClip;

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

const NoClipMessage = styled.div`
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

const ActionIcon = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.2rem;
`;

const CancelButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem 1rem;
  background-color: #D5D5D5;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  width: 200px;
  height: 50px;
  font-size: 1.5rem;
  font-family: 'BM DoHyeon', sans-serif;
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const DeleteButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem 1rem;
  background-color: #B0EB75;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  width: 200px;
  height: 50px;
  font-size: 1.5rem;
  font-family: 'BM DoHyeon', sans-serif;
  &:disabled {
    background-color: #D5D5D5;
    opacity: 0.5;
    cursor: not-allowed;
  }
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

const ClipManagementContainer = styled.div`
  display: flex;
  gap: 2rem;
`;

const ClipListContainer = styled.div`
  width: 50%;
`;

const ClipListTitle = styled.h3`
  font-size: 1.5rem;
  padding-bottom: 1.5rem;
  margin-bottom: 1.5rem;
  font-family: 'BM DoHyeon', sans-serif;
  border-bottom: 1px solid #D5D5D5;
`;

const ThumbnailGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: 1rem;
`;

const ThumbnailContainer = styled.div`
  cursor: pointer;
  position: relative;
  img {
    width: 100%;
    height: 100px;
    object-fit: cover;
  }
`;

const ClipDetailSection = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ClipDetailContainer = styled.div`
  width: 100%;
  max-width: 240px;
  margin: 0 auto;
`;

const ClipPlayerWrapper = styled.div`
  position: relative;
  width: 100%;
  padding-top: 177.78%; // 9:16 비율 (16 / 9 * 100)
`;

const PlayerOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.3);
  cursor: pointer;
`;

const PlayPauseIcon = styled(FontAwesomeIcon)`
  font-size: 3rem;
  color: white;
`;

const StyledReactPlayer = styled(ReactPlayer)`
  position: absolute;
  top: 0;
  left: 0;
`;

const ClipActionButtons = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  margin-top: 1rem;
`;

const NoClipSelectedMessage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 240px;
  height: 426.67px;
  background-color: #f0f0f0;
  font-size: 1.2rem;
  font-family: 'BM DoHyeon', sans-serif;
  color: #666;
`;

const ErrorMessage = styled.div`
  color: red;
  margin-bottom: 1rem;
  font-size: 1rem;
  font-family: 'KoreanHANAL', sans-serif;
`;

const ClipTitle = styled.span`
  font-size: 1rem;
  font-family: 'KoreanHANAL', sans-serif;
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

const NoUserMessage = styled.div`
  padding: 1rem;
  text-align: center;
  color: #666;
  font-size: 1.2rem;
  font-family: 'KoreanHANAL', sans-serif;
`;