import React from 'react';
import styled from 'styled-components';
import DayCardComponent from './rightContainer/DayCardComponent';
import { format } from 'date-fns';

const RightContainer = ({ post }) => {
    const days = generateDaysObject(post.tripStartDate, post.tripEndDate, post.tripDetails.places);

    return (
        <RightPanel>
            {Object.keys(days).map((date, index) => (
                <DayCardComponent
                    key={index}
                    day={date}
                    dayIndex={index + 1}
                    places={days[date]}
                    files={post.files}
                />
            ))}
        </RightPanel>
    );
};

export default RightContainer;

const generateDaysObject = (startDate, endDate, places) => {
    const days = {};
    let currentDate = new Date(startDate);
    const lastDate = new Date(endDate);

    while (currentDate <= lastDate) {
        const formattedDate = format(currentDate, 'yyyy-MM-dd');
        days[formattedDate] = [];
        currentDate.setDate(currentDate.getDate() + 1);
    }

    places.forEach((place) => {
        const visitDate = new Date(startDate);
        visitDate.setDate(visitDate.getDate() + (place.planDay - 1));
        const formattedVisitDate = format(visitDate, 'yyyy-MM-dd');

        if (days[formattedVisitDate]) {
            days[formattedVisitDate].push(place);
        }
    });

    Object.keys(days).forEach((date) => {
        days[date].sort((a, b) => a.idx - b.idx);
    });

    return days;
}

const RightPanel = styled.div`
    flex: 1;
    padding: 20px;
    box-sizing: border-box;
    overflow-y: auto;
`;
