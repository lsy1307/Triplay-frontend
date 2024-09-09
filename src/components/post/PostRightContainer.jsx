import React from 'react';
import styled from 'styled-components';
import DayCardComponent from './rightContainer/DayCardComponent';

const RightContainer = ({ post }) => {
    return (
        <RightPanel>
            {post.dates.map((date, index) => (
                <DayCardComponent
                    key={index}
                    day={date}
                    dayIndex={index + 1}
                    places={post.days[date]}
                />
            ))}
        </RightPanel>
    );
};

export default RightContainer;

const RightPanel = styled.div`
    flex: 1;
    padding: 20px;
    box-sizing: border-box;
    overflow-y: auto;
`;
