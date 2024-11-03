import React, { useEffect, useRef, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import styled from 'styled-components';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserTie, faAngleLeft, faAnglesLeft, faAngleRight, faAnglesRight, faArrowRight, faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import AdminHeader from '../../layout/AdminHeader';
import axios from 'axios';

const DetailModal = ({ isOpen, onClose, notice, onEdit, onDelete }) => {
  const [optionsOpen, setOptionsOpen] = useState(false);

  useEffect(() => {
    setOptionsOpen(false);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={e => e.stopPropagation()}>
        <ModalHeader>
          <HeaderLeft>
            <Avatar>
              <FontAwesomeIcon icon={faUserTie} size='3x' />
            </Avatar>
            <AuthorInfo>
              <AuthorName>{notice.author}</AuthorName>
              <NoticeDate>{notice.date}</NoticeDate>
            </AuthorInfo>
          </HeaderLeft>
          <OptionsContainer>
            <OptionsButton onClick={() => setOptionsOpen(!optionsOpen)}>
              <FontAwesomeIcon icon={faEllipsisVertical} size='2xl' />
            </OptionsButton>
            {optionsOpen && (
              <OptionsMenu>
                <OptionItem onClick={() => { onEdit(notice); setOptionsOpen(false); }}>수정</OptionItem>
                <OptionDivider />
                <OptionItem onClick={() => { onDelete(notice); setOptionsOpen(false); }} $delete>삭제</OptionItem>
              </OptionsMenu>
            )}
          </OptionsContainer>
        </ModalHeader>
        <ModalBody>
          <NoticeTitle>{notice.title}</NoticeTitle>
          <NoticeContent>{notice.content}</NoticeContent>
        </ModalBody>
        <ModalFooter>
          <ModalButton onClick={() => { onClose(); setOptionsOpen(false); }}>닫기</ModalButton>
        </ModalFooter>
      </ModalContent>
    </ModalOverlay>
  );
};

const EditModal = ({ isOpen, onClose, notice, onSubmit, isNewNotice }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    if (isOpen && notice) {
      setTitle(notice.title || '');
      setContent(notice.content || '');
    }
  }, [isOpen, notice]);

  if (!isOpen) return null;

  const handleSubmit = () => {
    onSubmit({ id: notice?.id, title, content });
  };

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={e => e.stopPropagation()}>
        <ModalBody>
          <ModalField>
            <ModalLabel>제목</ModalLabel>
            <ModalInput 
              value={title} 
              onChange={(e) => setTitle(e.target.value)}
            />
          </ModalField>
          <ModalField>
            <ModalLabel>본문</ModalLabel>
            <ModalTextarea 
              value={content} 
              onChange={(e) => setContent(e.target.value)}
            />
          </ModalField>
        </ModalBody>
        <ModalFooter>
          <ModalButton onClick={onClose}>취소</ModalButton>
          <ModalButton $primary onClick={handleSubmit}>
            {isNewNotice ? '등록' : '수정'}
          </ModalButton>
        </ModalFooter>
      </ModalContent>
    </ModalOverlay>
  );
};

const ConfirmModal = ({ isOpen, onClose, onConfirm, action }) => {
  if (!isOpen) return null;

  const actionText = {
    edit: '수정',
    delete: '삭제',
    register: '등록'
  };

  return (
    <ModalOverlay onClick={onClose}>
      <ConfirmContent onClick={e => e.stopPropagation()}>
        <h2>공지사항 {actionText[action]}</h2>
        <p>공지사항을 {actionText[action]}하시겠습니까?</p>
        <ConfirmButtons>
          <ConfirmButton onClick={onClose}>취소</ConfirmButton>
          <ConfirmButton $primary onClick={onConfirm}>{actionText[action]}</ConfirmButton>
        </ConfirmButtons>
      </ConfirmContent>
    </ModalOverlay>
  );
};

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

const AdminManageNotice = () => {
  const [notices, setNotices] = useState([]);
  const [sortOrder, setSortOrder] = useState('createdAt');
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [selectedNotice, setSelectedNotice] = useState(null);
  const [confirmAction, setConfirmAction] = useState(null);
  const [isNewNotice, setIsNewNotice] = useState(false);

  const ITEMS_PER_PAGE = 5;

  useEffect(() => {
    fetchNotices();
  }, [currentPage, sortOrder]);

  const fetchNotices = async () => {
    try {
      const response = await api.get(`/notices?page=${currentPage}&size=${ITEMS_PER_PAGE}&sortBy=${sortOrder}`);
      setNotices(response.data.content || []);
      setTotalPages(response.data.totalPages || 0);
    } catch (error) {
      console.error('공지사항을 불러오는데 실패했습니다:', error);
      setNotices([]);
      setTotalPages(0);
    }
  };

  const handleSort = (order) => {
    setSortOrder(order);
    setCurrentPage(0);
  };

  const handleRowClick = async (noticeId) => {
    try {
      const response = await api.get(`/notices/${noticeId}`);
      setSelectedNotice(response.data);
      setDetailModalOpen(true);
    } catch (error) {
      console.error('공지사항 상세 정보를 불러오는데 실패했습니다:', error);
    }
  };

  const handleRegister = () => {
    setIsNewNotice(true);
    setSelectedNotice(null);
    setEditModalOpen(true);
  };

  const handleSubmitNew = (newNotice) => {
    setSelectedNotice(newNotice);
    setEditModalOpen(false);
    setConfirmAction('register');
    setConfirmModalOpen(true);
  };

  const handleEdit = (notice) => {
    setIsNewNotice(false);
    setSelectedNotice(notice);
    setEditModalOpen(true);
  };

  const handleSubmitEdit = (editedNotice) => {
    setEditModalOpen(false);
    setSelectedNotice({...editedNotice, id: selectedNotice.id});
    setConfirmAction('edit');
    setConfirmModalOpen(true);
  };

  const handleDelete = () => {
    setDetailModalOpen(false);
    setConfirmAction('delete');
    setConfirmModalOpen(true);
  };

  const handleConfirm = async () => {
    try {
      let updatedNotice;
      if (confirmAction === 'register') {
        const response = await api.post('/notices', selectedNotice);
        updatedNotice = response.data;
      } else if (confirmAction === 'edit') {
        // id가 존재하는지 확인합니다.
        if (!selectedNotice.id) {
          throw new Error('공지사항 ID가 없습니다.');
        }
        const response = await api.put(`/notices/${selectedNotice.id}`, selectedNotice);
        updatedNotice = response.data;
      } else if (confirmAction === 'delete') {
        if (!selectedNotice.id) {
          throw new Error('공지사항 ID가 없습니다.');
        }
        await api.delete(`/notices/${selectedNotice.id}`);
      }
      
      setConfirmModalOpen(false);
      
      if (confirmAction === 'edit') {
        setNotices(notices.map(notice => 
          notice.id === updatedNotice.id ? updatedNotice : notice
        ));
        setDetailModalOpen(false);
      } else {
        await fetchNotices();
      }
      
      setSelectedNotice(null);
    } catch (error) {
      console.error(`공지사항 ${confirmAction}에 실패했습니다:`, error);
      alert(`공지사항 ${confirmAction} 중 오류가 발생했습니다: ${error.message}`);
    }
  };

  return (
    <Container>
      <AdminHeader />
      <ContentContainer>
        <TitleContainer>
          <Title>공지사항 관리 페이지</Title>
          <StyledLink to='/admin/manage'>
            관리자 페이지&nbsp;&nbsp;
            <FontAwesomeIcon icon={faArrowRight} size='lg' />
          </StyledLink>
        </TitleContainer>
        <SubTitle>공지사항을 등록, 수정, 삭제할 수 있습니다.</SubTitle>
        <MainContent>
          <ActionBar>
            <SortDropdown value={sortOrder} onChange={(e) => handleSort(e.target.value)}>
              <option value="createdAt">날짜순</option>
              <option value="title">제목순</option>
            </SortDropdown>
            <RegisterButton onClick={handleRegister}>공지사항 등록</RegisterButton>
          </ActionBar>
          {notices && notices.length > 0 ? (
            <>
              <NoticeTable>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>제목</th>
                    <th>작성자</th>
                    <th>작성일자</th>
                  </tr>
                </thead>
                <tbody>
                  {notices.map((notice) => (
                    <tr key={notice.id} onClick={() => handleRowClick(notice.id)}>
                      <td>{notice.id}</td>
                      <td>{notice.title}</td>
                      <td>{notice.author}</td>
                      <td>{new Date(notice.createdAt).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </NoticeTable>
              <Pagination>
                <PaginationIcon icon={faAnglesLeft} onClick={() => setCurrentPage(0)} />
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
                <PaginationIcon icon={faAnglesRight} onClick={() => setCurrentPage(totalPages - 1)} />
              </Pagination>
            </>
          ) : (
            <NoNoticeMessage>아직 등록된 공지사항이 없습니다.</NoNoticeMessage>
          )}
        </MainContent>
      </ContentContainer>
      <DetailModal 
        isOpen={detailModalOpen}
        onClose={() => setDetailModalOpen(false)}
        notice={selectedNotice}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      <EditModal
        isOpen={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        notice={selectedNotice}
        onSubmit={isNewNotice ? handleSubmitNew : handleSubmitEdit}
        isNewNotice={isNewNotice}
      />
      <ConfirmModal
        isOpen={confirmModalOpen}
        onClose={() => setConfirmModalOpen(false)}
        onConfirm={handleConfirm}
        action={confirmAction}
      />
    </Container>
  );
};

export default AdminManageNotice;

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

const RegisterButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: #B0EB75;
  color: white;
  border: none;
  border-radius: 30px;
  cursor: pointer;
  font-size: 1.2rem;
  font-family: 'KoreanHANAB', sans-serif;
`;

const NoticeTable = styled.table`
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
    width: 5%;
    color: #898989;
  }

  th:nth-child(2),
  td:nth-child(2) {
    width: 70%;
  }

  th:nth-child(3),
  td:nth-child(3) {
    width: 10%;
  }

  th:last-child,
  td:last-child {
    padding-right: 1.5rem;
    width: 15%;
  }

  tbody tr {
    cursor: pointer;
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

const NoNoticeMessage = styled.div`
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

const ModalContent = styled.div`
  background-color: white;
  padding: 2rem;
  border-radius: 30px;
  width: 100%;
  max-width: 600px;
  max-height: 600px;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 20px;
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
`;

const OptionsContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const OptionsButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 5px;
`;

const OptionsMenu = styled.div`
  position: absolute;
  right: 0;
  top: 100%;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 20px;
  box-shadow: 0 4px 3px rgba(0,0,0,0.3);
  z-index: 1000;
  min-width: 100px;
`;

const OptionItem = styled.div`
  padding: 0.5rem 2rem;
  cursor: pointer;
  color: ${props => props.$delete ? 'red' : 'black'};
  font-size: 1.2rem;
  font-family: 'KoreanHANAL', sans-serif;
`;

const OptionDivider = styled.hr`
  margin: 0;
  border: none;
  border-top: 2px solid #AAAAAA;
`;


const ModalBody = styled.div`
  margin-bottom: 20px;
`;

const ModalFooter = styled.div`
  display: flex;
  justify-content: space-around;
`;

const ModalField = styled.div`
  margin-bottom: 20px;
`;

const ModalLabel = styled.label`
  display: block;
  margin-bottom: 5px;
  font-size: 1.5rem;
  font-family: 'KoreanHANAB', sans-serif;
`;

const ModalInput = styled.input`
  width: 100%;
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 10px;
  font-size: 1.5rem;
  font-family: 'KoreanHANAL', sans-serif;
  box-shadow: 0 2px 1px rgba(0, 0, 0, 0.3);
`;

const ModalTextarea = styled.textarea`
  width: 100%;
  height: 200px;
  padding: 1rem;
  resize: none;
  font-size: 1rem;
  font-family: 'KoreanHANAL', sans-serif;
  margin-bottom: 3rem;
  border: 1px solid #ddd;
  border-radius: 10px;
  box-shadow: 0 2px 1px rgba(0, 0, 0, 0.3);
`;

const ModalButton = styled.button`
  width: 10rem;
  padding: 8px 16px;
  border: none;
  border-radius: 20px;
  font-size: 1.3rem;
  font-family: 'KoreanJJPPM', sans-serif;
  cursor: pointer;
  background-color: ${props => props.$primary ? '#B0EB75' : '#f0f0f0'};
  color: ${props => props.$primary ? 'white' : 'black'};
`;

const ConfirmContent = styled(ModalContent)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  max-width: 400px;
  height: 200px;

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

const ConfirmButton = styled(ModalButton)`
  width: 45%;
`;

const Avatar = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background-color: #ccc;
  margin-right: 20px;
`;

const AuthorInfo = styled.div`
  display: flex;
  flex-direction: column;
  
`;

const AuthorName = styled.span`
  font-size: 2rem;
  font-family: 'KoreanHANAB', sans-serif;
`;

const NoticeDate = styled.span`
  font-size: 1.5rem;
  font-family: 'KoreanHANAB', sans-serif;
  color: #5F6368;
`;

const NoticeTitle = styled.h2`
  margin-bottom: 3rem;
  font-size: 1.5rem;
  font-family: 'KoreanHANAB', sans-serif;
`;

const NoticeContent = styled.p`
  white-space: pre-wrap;
  margin-bottom: 3rem;
  font-size: 1rem;
  font-family: 'KoreanHANAL', sans-serif;
`;
