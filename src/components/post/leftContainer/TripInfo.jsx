import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import FollowButton from './FollowButton';

const TripInfo = ({ post, isFollowing, toggleFollowing }) => {
    return (
        <InfoWrapper>
            <InfoContainer>
                <WhoWith>{post.tripParty}</WhoWith>
                <Dates>{`${post.tripStartDate} ~ ${post.tripEndDate}`}</Dates>
            </InfoContainer>
            <Profile>
                <Link to={`/profile/${post.userId}`}>
                    <img src={post.profileImageUrl} alt="Profile" />
                </Link>
                <p>{post.userName}</p>
                <FollowButton isFollowing={isFollowing} toggleFollowing={toggleFollowing} />
            </Profile>
        </InfoWrapper>
    );
};

export default TripInfo;
const InfoWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 20px 0 10px;
`;

const InfoContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    flex: 1;
`;

const WhoWith = styled.div`
    font-size: 16px;
    color: black;
    background: #B5E69F;
    border-radius: 5px;
    padding: 5px 10px;
`;

const Dates = styled.div`
    font-size: 16px;
`;

const Profile = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        margin-right: 10px;
        cursor: pointer;
    }

    p {
        margin: 0;
        font-size: 16px;
    }
`;
