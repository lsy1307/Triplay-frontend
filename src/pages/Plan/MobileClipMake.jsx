import { GetAxiosInstance } from '../../axios/AxiosMethod.js';
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import styled from 'styled-components';
import MobileHeader from '../../layout/MobileHeader.jsx';
import LoadingComponent from '../../components/clipMakePage/upperContainer/LoadingComponent.jsx';
import ClipPreviewComponent from '../../components/clipMakePage/upperContainer/ClipPreviewComponent.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import ClipExtraInfoRegistComponent from '../../components/clipMakePage/upperContainer/ClipExtraInfoRegistComponent.jsx';

const MobileClipMake = () => {

  const { clipId } = useParams();
  const [ images, setIamges ] = useState([])
  const [ isLoading, setIsLoading ] = useState(true)
  const [ isReady, setIsReady ] = useState(false)

  const changeImages = (newImages) => {
    setIamges(prevState => newImages)
  }

  const changeIsLoading = () => {
    setIsLoading(prev => !prev);
  }

  const changeIsReady = () => {
    setIsReady(prev => !prev);
  }

  const getPostImages = async () => {
    const response = await GetAxiosInstance(`https://localhost:8443/file/image/clip/${clipId}`, {
      // TODO :: Clip Image Get EndPoint 수정
      headers: { 'Content-Type': 'application/json' },
    });
    changeImages(response.data)
  };

  useEffect(() => {
    getPostImages()
  }, []);

  useEffect(() => {
    if(images.length > 0) {
      changeIsLoading();
    }
  }, [images])

  return  <>
    <TotalContainer>
      <MobileHeader />
      <InnerContainer>
        {
          isLoading ?
          <LoadingComponent
            images={images}
            isLoading={isLoading}
            changeIsLoading={changeIsLoading}
          /> :
          (
            isReady ?
            <ClipExtraInfoRegistComponent
              clipId={clipId}
            /> :
            <ClipPreviewComponent
              images={images}
              changeIsReady={changeIsReady}
            />
          )
        }
      </InnerContainer>
    </TotalContainer>
    {(isReady && isReady) && <ReturnButton onClick={changeIsReady}><ReturnIconSvg icon={faArrowLeft}/>Return</ReturnButton>}
  </>
}

export default MobileClipMake

const TotalContainer = styled.div`
  height: 100vh; /* 전체 화면을 차지하도록 설정 */
  display: flex;
  flex-direction: column;
  margin: 0; /* 기본 여백 제거 */
`

const InnerContainer = styled.div`
  width: 100%;
  flex-grow: 1; /* 남은 공간을 차지 */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden; /* 내부 콘텐츠가 넘치는 경우 숨김 처리 */
`

const ReturnButton = styled.button`
    position: fixed;
    bottom: 1rem;
    left: 1rem;
    border-radius: 0.5rem;
    background-color: black;
    color: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 5rem;
    height: 5rem;
`

const ReturnIconSvg = styled(FontAwesomeIcon)`
    width: 2rem;
    height: 2rem;
`