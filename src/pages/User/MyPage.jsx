import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { getTrips, getPosts, getClips } from '../../api/myPage';
import Header from '../../layout/Header';
import TripCard from '../../components/mypage/TripCard';
import PostCard from '../../components/mypage/PostCard'; // PostCard 컴포넌트 추가

const MyPage = () => {
  const [items, setItems] = useState([]);
  const [activeTab, setActiveTab] = useState('trip'); // 초기 탭을 'trip'으로 설정

  useEffect(() => {
    const fetchItems = async () => {
      let fetchedItems = [];
      try {
        if (activeTab === 'trip') {
          fetchedItems = await getTrips();
        } else if (activeTab === 'post') {
          fetchedItems = await getPosts();
        } else if (activeTab === 'clip') {
          fetchedItems = await getClips();
        }
        setItems(Array.isArray(fetchedItems) ? fetchedItems : []);
      } catch (error) {
        setItems([]);
      }
    };
    fetchItems();
  }, [activeTab]);

  const renderNoItemsMessage = () => {
    if (activeTab === 'trip') {
      return '아직 준비된 여행이 없어요! 같이 준비하러 가볼까요?';
    } else if (activeTab === 'post') {
      return '아직 작성된 게시물이 없어요!';
    } else if (activeTab === 'clip') {
      return '저장된 클립이 없어요!';
    }
  };

  return (
    <div>
      <Header />
      <Container>
        <TabContainer>
          <TabButton $active={activeTab === 'trip'} onClick={() => setActiveTab('trip')}>
            Trip
          </TabButton>
          <TabButton $active={activeTab === 'post'} onClick={() => setActiveTab('post')}>
            Post
          </TabButton>
          <TabButton $active={activeTab === 'clip'} onClick={() => setActiveTab('clip')}>
            Clip
          </TabButton>
        </TabContainer>
        <ItemContainer>
          {items.length > 0 ? (
            <Grid $activeTab={activeTab}>
              {activeTab === 'trip' &&
                items.map((trip, index) => <TripCard key={index} trip={trip} />)}
              {activeTab === 'post' &&
                items.map((post, index) => <PostCard key={index} post={post} />)} {/* PostCard로 Post 표시 */}
              {activeTab === 'clip' &&
                items.map((clip, index) => (
                  <Item key={index}>{clip.title || clip.name || 'No Title'}</Item>
                ))}
            </Grid>
          ) : (
            <NoItemsMessage>{renderNoItemsMessage()}</NoItemsMessage>
          )}
        </ItemContainer>
      </Container>
    </div>
  );
};

export default MyPage;

// Styled Components
const Container = styled.div`
  padding: 20px;
`;

const TabContainer = styled.div`
  display: flex;
  width: 80%;
  margin: 0 auto;
`;

const TabButton = styled.button`
  padding: 10px 20px;
  cursor: pointer;
  flex-grow: 1;
  background-color: ${({ $active }) => ($active ? '#4C4C4C' : '#B2B2B2')};
  color: white;
  border: none;
  border-radius: 0;

  &:first-child {
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
  }

  &:last-child {
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
  }

  &:hover {
    background-color: #4C4C4C;
  }
`;

const ItemContainer = styled.div`
  margin-top: 20px;
  width: 80%;
  margin: 20px auto;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: ${({ $activeTab }) =>
    $activeTab === 'trip' ? 'repeat(auto-fill, minmax(300px, 1fr))' : 'repeat(auto-fill, minmax(500px, 1fr))'};
  gap: 20px;
`;

const Item = styled.div`
  padding: 10px;
  background-color: #f0f0f0;
  border-radius: 5px;
  text-align: center;
`;

const NoItemsMessage = styled.div`
  padding: 20px;
  font-size: 16px;
  color: #777;
  text-align: center;
`;
