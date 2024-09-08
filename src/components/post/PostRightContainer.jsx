import React, { useState } from 'react';
import styled from 'styled-components';

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

const DayCardComponent = ({ day, dayIndex, places }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = () => {
        setIsOpen(!isOpen);
    };

    return (
        <DayCard>
            <DayHeader>
                <h2>{`Day ${dayIndex} (${day})`}</h2>
                <ToggleButton onClick={toggleOpen} isOpen={isOpen}>
                    <svg width="60" height="60" viewBox="0 0 24 24">
                        <path d="M7 10l5 5 5-5z" />
                    </svg>
                </ToggleButton>
            </DayHeader>
            {isOpen && (
                <PlacesContainer>
                    {/* 스크랩 Backend 기능 추가 시 보완 필요*/}
                    {places.map((place, placeIndex) => (
                        <PlaceCardComponent key={placeIndex} place={place} />
                    ))}
                </PlacesContainer>
            )}
        </DayCard>
    );
};

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
                <OptionsButton onClick={openReportModal}>
                    •••
                </OptionsButton>
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

const ReportModal = ({ onClose }) => {
    return (
        <ModalOverlay>
            <ModalContent>
                {/* report url 생성되면 신고 로직 추가 예정 */}
                <h2>신고</h2>
                <ul>
                    <li>홍보/상업성</li>
                    <li>같은 내용 도배</li>
                    <li>욕설/인신공격</li>
                    <li>음란/선정성</li>
                    <li>불법정보</li>
                    <li>권리침해 신고</li>
                </ul>
                <CloseButton onClick={onClose}>닫기</CloseButton>
            </ModalContent>
        </ModalOverlay>
    );
};

export default RightContainer;

const RightPanel = styled.div`
    flex: 1;
    padding: 20px;
    box-sizing: border-box;
    overflow-y: auto;
`;

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

const ToggleButton = styled.button`
    padding: 5px;
    background-color: transparent;
    border: none;
    cursor: pointer;

    svg {
        transform: ${({ isOpen }) => (isOpen ? 'rotate(180deg)' : 'rotate(0deg)')};
        transition: transform 0.3s ease;
    }
`;

const PlacesContainer = styled.div`
    margin-top: 10px;
`;

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
    margin-bottom: 10px;
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

const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
`;

const ModalContent = styled.div`
    background: white;
    padding: 20px;
    border-radius: 10px;
    width: 400px;
    text-align: center;

    h2 {
        margin-bottom: 20px;
    }

    ul {
        list-style-type: none;
        padding: 0;

        li {
            margin: 5px 0;
            font-size: 18px;
            cursor: pointer;
            padding: 10px;

            &:hover {
                background-color: #F4F4F4;
            }
        }
    }
`;

const CloseButton = styled.button`
    margin-top: 20px;
    padding: 10px 20px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
`;
