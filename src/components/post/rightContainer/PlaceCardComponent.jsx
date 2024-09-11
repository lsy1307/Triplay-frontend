import React, { useState } from 'react';
import styled from 'styled-components';
import ReportModal from './ReportModal';

const PlaceCardComponent = ({ place }) => {
    const [showReportModal, setShowReportModal] = useState(false);

    const openReportModal = () => {
        setShowReportModal(true);
    };

    const closeReportModal = () => {
        setShowReportModal(false);
    };

    return (
        <PlaceCard>
            <PlaceHeader>
                <h4>{place.name}</h4>
                <OptionsButton onClick={openReportModal}>•••</OptionsButton>
            </PlaceHeader>
            <Images>
                {place.images.map((image, imgIndex) => (
                    <img src={image} alt={`Place ${imgIndex}`} key={imgIndex} />
                ))}
            </Images>

            {showReportModal && <ReportModal onClose={closeReportModal} />}
        </PlaceCard>
    );
};

export default PlaceCardComponent;

const PlaceCard = styled.div`
    margin-bottom: 10px;
    border: solid 0.5px;
    padding: 20px;
`;

const PlaceHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const OptionsButton = styled.button`
    background-color: transparent;
    border: none;
    font-size: 20px;
    cursor: pointer;
`;

const Images = styled.div`
    display: flex;
    gap: 10px;

    img {
        width: 150px;
        height: 150px;
        object-fit: cover;
        border-radius: 5px;
    }
`;
