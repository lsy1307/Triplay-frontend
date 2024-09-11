import React, { useState } from 'react';
import styled from 'styled-components';
import BookmarkButton from './BookmarkButton';

const TripTitle = ({ post }) => {
    return (
        <TitleContainer>
            <h1>{post.title}</h1>
            <BookmarkButton />
        </TitleContainer>
    );
};

export default TripTitle;

const TitleContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

    h1 {
        font-size: 36px;
        font-weight: bold;
    }
`;
