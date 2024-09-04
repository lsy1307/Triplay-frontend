import React from 'react';
import styled from 'styled-components';
import Header from '../../layout/Header';
import { useNavigate } from 'react-router-dom';

const Posts = () => {
    const navigate = useNavigate();

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
                    {postData.map((post, index) => (
                        <PostCard key={index} onClick={() => handleCardClick(post.id)}>
                            <img src={post.src} alt={`Post ${index + 1}`} />
                            <TextOverlay>
                                <div className="top-row">
                                    <h3>{post.title}</h3>
                                    <p>{post.schedule}</p>
                                </div>
                                <div className="bottom-row">
                                    <div className="profile-info">
                                        <img src={post.profilePic} alt="Profile" />
                                        <p>{post.nickname}님의 <br/>
                                        {post.city}</p>
                                    </div>
                                    <div className="icons">
                                        <img src={post.iconWho} alt="Who with" />
                                        <img src={post.iconTheme} alt="Theme" />
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

// ************ BE 연결 후 삭제 예정 ************
const postData = [
    {
        src: "../src/assets/images/post/6158BB8D-FD7F-4E78-A302-F7C331F596DA_1_105_c.jpeg",
        title: "도주제주도",
        schedule: "2박 3일",
        profilePic: "../src/assets/images/profile/90263554-A17D-4A49-B3E2-6C6915C0B76E_1_105_c.jpeg",
        nickname: "수연수연",
        city: "제주",
        iconWho: "../src/assets/images/icons/party/family.png",
        iconTheme: "../src/assets/images/icons/theme/relax.png"
    },
    {
        src: "../src/assets/images/post/2252C171-C8C1-4355-9692-E27DB969F5C9_1_102_o.jpeg",
        title: "rudwnrudrlwkd",
        schedule: "1박 2일",
        profilePic: "../src/assets/images/profile/142F50F2-F6E7-44E9-8115-532D35D93BE3.jpeg",
        nickname: "lsy",
        city: "경주",
        iconWho: "../src/assets/images/icons/party/family.png",
        iconTheme: "../src/assets/images/icons/theme/relax.png"
    },
    {
        src: "../src/assets/images/post/6158BB8D-FD7F-4E78-A302-F7C331F596DA_1_105_c.jpeg",
        title: "도주제주도",
        schedule: "2박 3일",
        profilePic: "../src/assets/images/profile/90263554-A17D-4A49-B3E2-6C6915C0B76E_1_105_c.jpeg",
        nickname: "수연수연",
        city: "제주",
        iconWho: "../src/assets/images/icons/party/family.png",
        iconTheme: "../src/assets/images/icons/theme/relax.png"
    },
    {
        src: "../src/assets/images/post/2252C171-C8C1-4355-9692-E27DB969F5C9_1_102_o.jpeg",
        title: "rudwnrudrlwkd",
        schedule: "1박 2일",
        profilePic: "../src/assets/images/profile/142F50F2-F6E7-44E9-8115-532D35D93BE3.jpeg",
        nickname: "lsy",
        city: "경주",
        iconWho: "../src/assets/images/icons/party/family.png",
        iconTheme: "../src/assets/images/icons/theme/relax.png"
    },
    {
        src: "../src/assets/images/post/6158BB8D-FD7F-4E78-A302-F7C331F596DA_1_105_c.jpeg",
        title: "도주제주도",
        schedule: "2박 3일",
        profilePic: "../src/assets/images/profile/90263554-A17D-4A49-B3E2-6C6915C0B76E_1_105_c.jpeg",
        nickname: "수연수연",
        city: "제주",
        iconWho: "../src/assets/images/icons/party/family.png",
        iconTheme: "../src/assets/images/icons/theme/relax.png"
    }
];
