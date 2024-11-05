import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import Header from '../../layout/Header';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import LoadingComponent from '../../components/clipMakePage/upperContainer/LoadingComponent.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { GetAxiosInstance } from '../../axios/AxiosMethod.js';

const ClipDetail = () => {
    const { clipId } = useParams();
    const [ images, setIamges ] = useState([])
    const [ isLoading, setIsLoading ] = useState(true)
    const [currentIndex, setCurrentIndex] = useState(0);
    const intervalRef = useRef(null); // 인터벌 ID 저장을 위한 ref

    const changeImages = (newImages) => {
        setIamges(prevState => newImages)
    }

    const changeIsLoading = () => {
        setIsLoading(prev => !prev);
    }

    const getClipImages = async () => {
        const response = await GetAxiosInstance(`https://localhost:8443/file/image/clip/${clipId}`, {
          // TODO :: Clip Image Get EndPoint 수정
          headers: { 'Content-Type': 'application/json' },
        });
        changeImages(response.data)
    };

    const handleTouch = (event) => {
        const containerWidth = event.currentTarget.clientWidth;
        const touchX = event.clientX || event.touches[0].clientX;

        // 터치한 위치에 따라 이전 또는 다음 이미지로 이동
        if (touchX < containerWidth / 2) {
            // 왼쪽 반쪽 터치
            console.log(images.length);
            setCurrentIndex((prevIndex) => {
                const newIndex = prevIndex > 0 ? prevIndex - 1 : images.length - 1;
                console.log(`이전 이미지: ${newIndex}`); // 로그 추가
                return newIndex;
            });
        } else {
            // 오른쪽 반쪽 터치
            setCurrentIndex((prevIndex) => {
                const newIndex = prevIndex < images.length - 1 ? prevIndex + 1 : 0;
                console.log(`다음 이미지: ${newIndex}`); // 로그 추가
                return newIndex;
            });
        }
        resetInterval(); // 터치 시 인터벌 리셋
    };

    // 자동 변경을 위한 함수
    const startInterval = () => {
        intervalRef.current = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex < images.length - 1 ? prevIndex + 1 : 0));
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
    }, [images.length]);

    useEffect(() => {
        getClipImages()
    }, []);

    useEffect(() => {
        if(images.length > 0) {
            changeIsLoading();
        }
    }, [images])

    return (<>
        <TotalContainer>
            <Header></Header>
            <InnerContainer>
            {
                isLoading ?
                <LoadingComponent
                    images={images}
                    isLoading={isLoading}
                    changeIsLoading={changeIsLoading}
                /> :
                <InnerWrapperContainer>
                    <ImageContainer onTouchStart={handleTouch}>
                        {images.map((imageUrl, index) => (
                            <ImageWrapper key={index} isVisible={index === currentIndex}>
                                <BlurredBackground backgroundColorSource={imageUrl} isVisible={index === currentIndex}/>
                                <img src={imageUrl} alt={`Clip ${index}`} style={{ width: '100%', objectFit: 'cover' }} />
                            </ImageWrapper>
                    ))}
                    </ImageContainer>
                </InnerWrapperContainer>
            }
            </InnerContainer>
        </TotalContainer>
    </>)
}

export default ClipDetail;

const TotalContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    justify-content: center;
    align-items: center;
`

const InnerContainer = styled.div`
  width: 25%;
  height: 100%;
  flex-grow: 1; /* 남은 공간을 차지 */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden; /* 내부 콘텐츠가 넘치는 경우 숨김 처리 */
`

const InnerWrapperContainer = styled.div`
    width: 100%;
    height: 100%;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    align-items: center;
`

const ImageContainer = styled.div`
    position: relative;
    width: 80%;
    align-items: center;
    height: 90%;
    overflow: hidden;
    cursor: pointer; /* 포인터 커서 추가 */
`;

const ImageWrapper = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #f5f5dc;
    opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
    aspect-ratio: 2 / 1;
    border: 0 solid black;
    border-radius: 1rem;
    overflow: hidden;

    img {
        position: relative;
        z-index: 1; /* img가 배경보다 위에 표시되도록 설정 */
    }
`;

// 흐릿한 배경 처리
const BlurredBackground = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url(${({ backgroundColorSource }) => backgroundColorSource});
    background-size: cover;
    opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
    background-position: center;
    filter: blur(40px); /* 배경 흐리게 처리 */
    z-index: 0; /* img보다 뒤에 표시되도록 설정 */
    border-radius: 1rem;
`;