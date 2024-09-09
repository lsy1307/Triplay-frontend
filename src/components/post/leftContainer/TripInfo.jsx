import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import FollowButton from './FollowButton';

const TripInfo = ({ post, startDate, endDate, isFollowing, toggleFollowing }) => {
    return (
        <InfoWrapper>
            <InfoContainer>
                <WhoWith>{post.with}</WhoWith>
                <Dates>{`${startDate} ~ ${endDate}`}</Dates>
            </InfoContainer>
            <Profile>
                <Link to={`/profile/${post.userId}`}>
                    <img src={post.profilePic} alt="Profile" />
                </Link>
                <FollowButton isFollowing={isFollowing} toggleFollowing={toggleFollowing} />
            </Profile>
        </InfoWrapper>
    );
};

export default TripInfo;

const InfoWrapper = styled.div`
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
