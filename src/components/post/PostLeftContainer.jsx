import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { GoogleMap, Marker } from '@react-google-maps/api';
import { Link } from 'react-router-dom';
import axios from 'axios'; // axios 가져오기

const LeftContainer = ({ post, isLoaded }) => {
    const [isBookmarked, setIsBookmarked] = useState(false);
    const [isFollowing, setIsFollowing] = useState(false);
    const startDate = post.dates[0];
    const endDate = post.dates[post.dates.length - 1];

    useEffect(() => {
        const checkIfFollowing = async () => {
            try {
                const response = await axios.get(`/follow/${post.userId}/${post.currentUserId}`);
                setIsFollowing(response.data);
            } catch (error) {
                console.error('팔로잉 여부 확인 실패:', error);
            }
        };

        checkIfFollowing();
    }, [post.userId, post.currentUserId]);

    const toggleBookmark = () => {
        setIsBookmarked(!isBookmarked);
    };

    const toggleFollowing = async () => {
        try {
            if (isFollowing) {
                await axios.delete(`/follow/${post.userId}/${post.currentUserId}`);
                setIsFollowing(false);
            } else {
                await axios.post(`/follow/${post.userId}/${post.currentUserId}`);
                setIsFollowing(true);
            }
        } catch (error) {
            console.error('팔로우/언팔로우 실패:', error);
        }
    };

    return (
        <LeftPanel>
            <TripTitle>
                <h1>{post.title}</h1>
                <BookmarkButton onClick={toggleBookmark}>
                    {isBookmarked ? (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            width="50"
                            height="50"
                            fill="#B0EB75"
                        >
                            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
                        </svg>
                    ) : (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            width="50"
                            height="50"
                            fill="#CACACA"
                        >
                            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
                        </svg>
                    )}
                </BookmarkButton>
            </TripTitle>
            <MapContainer>
                {isLoaded ? (
                    <GoogleMap
                        mapContainerStyle={{ height: "100%", width: "100%" }}
                        center={post.places[0].location}
                        zoom={10}
                    >
                        {post.places.map((place, index) => (
                            <Marker
                                key={index}
                                position={place.location}
                                label={(index + 1).toString()}
                            />
                        ))}
                    </GoogleMap>
                ) : (
                    <p>지도 로딩 중...</p>
                )}
            </MapContainer>
            <TripInfo>
                <InfoContainer>
                    <WhoWith>{post.with}</WhoWith>
                    <Dates>{`${startDate} ~ ${endDate}`}</Dates>
                </InfoContainer>
                <Profile>
                    <Link to={`/profile/${post.userId}`}>
                        <img src={post.profilePic} alt="Profile" />
                    </Link>
                    <FollowButton onClick={toggleFollowing}>
                        {isFollowing ? '언팔로우' : '팔로우'}
                    </FollowButton>
                </Profile>
            </TripInfo>
        </LeftPanel>
    );
};

export default LeftContainer;

const LeftPanel = styled.div`
    flex: 1;
    padding: 20px;
    box-sizing: border-box;
    overflow-y: auto;
`;

const TripTitle = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

    h1 {
        font-size: 36px;
        font-weight: bold;
    }
`;

const BookmarkButton = styled.button`
    padding: 5px;
    background-color: transparent;
    border: none;
    cursor: pointer;

    svg {
        width: 50px;
        height: 50px;
        transition: fill 0.3s ease, stroke 0.3s ease;
    }
`;

const MapContainer = styled.div`
    width: 100%;
    height: 60%;
    margin: 20px 0;
`;

const TripInfo = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 20px;
`;

const InfoContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
`;

const WhoWith = styled.div`
    font-size: 16px;
    color: white;
    background: black;
    border-radius: 12px;
    padding: 5px;
`;

const Dates = styled.div`
    font-size: 16px;
    margin-right: 10px;
`;

const Profile = styled.div`
    display: flex;
    align-items: center;

    img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        margin-right: 10px;
        cursor: pointer;
    }
`;

const FollowButton = styled.button`
    padding: 5px 10px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 14px;

    &:hover {
        background-color: #0056b3;
    }
`;
