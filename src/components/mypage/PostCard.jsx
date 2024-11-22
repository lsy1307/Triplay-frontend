import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const PostCard = ({ post }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/post/${post.postId}`); // postId를 기반으로 상세 페이지로 이동
  };

  return (
    <Card onClick={handleClick}>
      <Thumbnail src={post.thumbNailUrl} alt="Thumbnail" />
      <Details>
        <Title>{post.postTitle || '제목 없음'}</Title>
        <Info>
          <DetailItem>
            <p>{post.tripParty || '정보 없음'}</p>
          </DetailItem>
          <DetailItem>
            <p>{post.tripStartDate} ~ {post.tripEndDate}</p>
          </DetailItem>
        </Info>
      </Details>
    </Card>
  );
};

export default PostCard;

// Styled Components
const Card = styled.div`
  display: flex;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  margin: 20px 0;
  width: 600px; /* 카드 크기 */
  height: 300px; /* 카드 높이 */
  cursor: pointer; /* 클릭 가능 커서 */
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.03); /* 호버 시 약간 확대 */
  }
`;

const Thumbnail = styled.img`
  width: 50%;
  height: 100%;
  object-fit: cover;
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 20px;
  flex: 1;
  background-color: #fff;
`;

const Title = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
  font-weight: bold;
  color: #333;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const DetailItem = styled.div`
  font-size: 16px;
  color: #555;
`;
