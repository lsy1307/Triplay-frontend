import React, { useState } from 'react';
import styled from 'styled-components';
import ToggleButton from './ToggleButton';
import PlaceCardComponent from './PlaceCardComponent';

const DayCardComponent = ({ day, dayIndex, places, files }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = () => {
        setIsOpen(!isOpen);
    };

    const placesForThisDay = places.filter((place) => place.planDay === dayIndex);

    return (
        <DayCard>
            <DayHeader>
                <h2>{`${dayIndex}일차 (${day})`}</h2>
                <ToggleButton isOpen={isOpen} onClick={toggleOpen} />
            </DayHeader>
            {isOpen && (
                <PlacesContainer>
                    {placesForThisDay.map((place, idx) => (
                        <PlaceCardComponent key={idx} place={place} files={files} />
                    ))}
                </PlacesContainer>
            )}
        </DayCard>
    );
};

export default DayCardComponent;

const DayCard = styled.div`
    margin-bottom: 20px;
    border: solid 0.5px;
    padding: 20px;
`;

const DayHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

    h2 {
        font-size: 28px;
    }
`;

const PlacesContainer = styled.div`
    margin-top: 10px;
`;
