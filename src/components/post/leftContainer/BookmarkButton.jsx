import React, { useState } from 'react';
import styled from 'styled-components';
import { ReactComponent as BookmarkedIcon } from '../../../assets/svgs/bookmarked_icon.svg';
import { ReactComponent as UnBookmarkedIcon } from '../../../assets/svgs/unbookmarked_icon.svg';

const BookmarkButton = () => {
    const [isBookmarked, setIsBookmarked] = useState(false);

    const toggleBookmark = () => {
        setIsBookmarked(!isBookmarked);
    };

    return (
        <Button onClick={toggleBookmark}>
            {isBookmarked ? <BookmarkedIcon /> : <UnBookmarkedIcon />}
        </Button>
    );
};

export default BookmarkButton;

const Button = styled.button`
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
