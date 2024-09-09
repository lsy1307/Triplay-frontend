import React from 'react';
import styled from 'styled-components';

const FollowButton = ({ isFollowing, toggleFollowing }) => {
    return (
        <Button onClick={toggleFollowing}>
            {isFollowing ? '언팔로우' : '팔로우'}
        </Button>
    );
};

export default FollowButton;

const Button = styled.button`
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
