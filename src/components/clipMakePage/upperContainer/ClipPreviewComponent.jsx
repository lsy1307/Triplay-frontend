import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

const ClipPreviewComponent = (props) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const intervalRef = useRef(null); // 인터벌 ID 저장을 위한 ref

    const handleTouch = (event) => {
        const containerWidth = event.currentTarget.clientWidth;
        const touchX = event.clientX || event.touches[0].clientX;

        // 터치한 위치에 따라 이전 또는 다음 이미지로 이동
        if (touchX < containerWidth / 2) {
            // 왼쪽 반쪽 터치
            console.log(props.images.length);
            setCurrentIndex((prevIndex) => {
                const newIndex = prevIndex > 0 ? prevIndex - 1 : props.images.length - 1;
                console.log(`이전 이미지: ${newIndex}`); // 로그 추가
                return newIndex;
            });
        } else {
            // 오른쪽 반쪽 터치
            setCurrentIndex((prevIndex) => {
                const newIndex = prevIndex < props.images.length - 1 ? prevIndex + 1 : 0;
                console.log(`다음 이미지: ${newIndex}`); // 로그 추가
                return newIndex;
            });
        }
        resetInterval(); // 터치 시 인터벌 리셋
    };

    // 자동 변경을 위한 함수
    const startInterval = () => {
        intervalRef.current = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex < props.images.length - 1 ? prevIndex + 1 : 0));
        }, 5000); // 5초마다 변경
    };

    // 인터벌 초기화 함수
    const resetInterval = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }
        startInterval(); // 새로운 인터벌 시작
    };

    // 컴포넌트 마운트 시 인터벌 시작
    useEffect(() => {
        resetInterval();
        return () => clearInterval(intervalRef.current); // 언마운트 시 인터벌 클리어
    }, [props.images.length]);

    return (
        <ImageContainer onTouchStart={handleTouch}>
            {props.images.map((imageUrl, index) => (
                <ImageWrapper key={index} isVisible={index === currentIndex}>
                    <img src={imageUrl} alt={`Clip ${index}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </ImageWrapper>
            ))}
        </ImageContainer>
    );
};

export default ClipPreviewComponent;

const ImageContainer = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    cursor: pointer; /* 포인터 커서 추가 */
`;

const ImageWrapper = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
    transition: opacity 0.5s; /* 부드러운 전환 효과 */
`;
