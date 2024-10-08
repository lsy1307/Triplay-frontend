import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Header from '../../layout/Header';
import { useNavigate } from 'react-router-dom';
import { fetchPosts } from '../../api/allposts';
import { fetchUserDetail } from '../../api/userDetail';
import { fetchTripDetails } from '../../api/tripDetail';
import { fetchFileDetails } from '../../api/fileDetail';
import { getIconWho } from '../../components/iconUtils';

const Posts = () => {
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const getPosts = async () => {
            try {
                const fetchedPosts = await fetchPosts();

                const postsWithDetails = await Promise.all(fetchedPosts.map(async (post) => {
                    const userDetails = await fetchUserDetail(post.userId);  // 사용자 정보와 프로필 사진 가져오기
                    const tripDetails = await fetchTripDetails(post.tripId);
                    const fileDetails = await fetchFileDetails(post.postId);

                    const thumbnailUrl = post.imageUrls.length > 0 ? post.imageUrls[0] : null;

                    return {
                        ...post,
                        userDetails,
                        tripDetails,
                        fileDetails,
                        thumbnailUrl,
                    };
                }));

                setPosts(postsWithDetails);
            } catch (error) {
                console.error("Error loading posts: ", error);
            }
        };

        getPosts();
    }, []);

    const handleCardClick = (postId) => {
        navigate(`/post/${postId}`);
    };

    return (
        <div>
            <Header />
            <Container>
                <SearchBarContainer>
                    <input type="text" placeholder="떠나고 싶은 장소를 찾아보세요!" />
                    <button>검색</button>
                </SearchBarContainer>
                <PostGrid>
                    {posts.map((post, index) => (
                        <PostCard key={index} onClick={() => handleCardClick(post.id)}>
                            <img src={post.thumbnailUrl} alt={`Post ${index + 1}`} />
                            <TextOverlay>
                                <div className="top-row">
                                    <p>{post.tripDetails?.tripStartDate} ~ {post.tripDetails?.tripEndDate}</p>
                                </div>
                                <div className="bottom-row">
                                    <div className="profile-info">
                                        <img src={post.userDetails?.profilePicUrl} alt="Profile" /> {/* 프로필 사진 */}
                                        <p>{post.userDetails?.userName}님의 <br/>
                                        {post.postTitle}</p>
                                    </div>
                                    <div className="icons">
                                        <img src={getIconWho(post.tripDetails?.tripParty)} alt="누구와" />
                                    </div>
                                </div>
                            </TextOverlay>
                        </PostCard>
                    ))}
                </PostGrid>
            </Container>
        </div>
    );
}

export default Posts;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 50px;
`;

const SearchBarContainer = styled.div`
    display: flex;
    align-items: center;
    margin: 20px 0;

    input {
        width: 300px;
        padding: 10px;
        border: 2px solid #ccc;
        border-radius: 5px;
        font-size: 16px;
    }

    button {
        padding: 10px 20px;
        margin-left: 10px;
        border: none;
        background-color: #000;
        color: #fff;
        font-size: 16px;
        border-radius: 5px;
        cursor: pointer;
    }

    button:hover {
        background-color: #333;
    }
`;

const PostGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));
    gap: 20px;
    width: 100%;
    justify-content: center;
`;

const TextOverlay = styled.div`
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    color: black;
    padding: 16px;
    box-sizing: border-box;
    text-align: left;
    background: white;
    opacity: 0;
    transition: opacity 0.3s ease-in-out;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height:40%;

    .top-row {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .bottom-row {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .profile-info {
            display: flex;
            align-items: center;

            img {
                border-radius: 50%;
                width: 40px;
                height: 40px;
                margin-right: 12px;
            }
        }

        .icons {
            display: flex;
            gap: 10px;

            img {
                width: 40px;
                height: 40px;
            }
        }
    }

    h3 {
        margin: 0;
        font-size: 24px;
    }

    p {
        margin: 5px 0 0;
        font-size: 16px;
    }
`;

const PostCard = styled.button`
    position: relative;
    overflow: hidden;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    height: 360px;
    width: 100%;
    border: none;
    padding: 0;
    cursor: pointer;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
    }

    &:hover ${TextOverlay} {
        opacity: 1;
    }
`;
