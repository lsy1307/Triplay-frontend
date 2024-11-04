import React, { useState } from 'react';
import styled from 'styled-components';
import ReportModal from './ReportModal';

const PlaceCardComponent = ({ place, files }) => {
    const [showReportModal, setShowReportModal] = useState(false);

    const openReportModal = () => {
        setShowReportModal(true);
    };

    const closeReportModal = () => {
        setShowReportModal(false);
    };

    const placeImages = files
        .filter(file => file.postPlaceId === place.id)
        .sort((a, b) => a.postImageOrder - b.postImageOrder);

    return (
        <PlaceCard>
            <PlaceHeader>
                <h4>{place.locationName}</h4>
                <p>{place.address || '주소를 찾을 수 없습니다.'}</p>
                <OptionsButton onClick={openReportModal}>•••</OptionsButton>
            </PlaceHeader>
            <Images>
                {placeImages.map((file, idx) => (
                    <img src={file.fileUrl} alt={`Place ${idx}`} key={idx} />
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
