import { GetAxiosInstance } from '../../axios/AxiosMethod.js';
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import styled from 'styled-components';
import MobileHeader from '../../layout/MobileHeader.jsx';
import LoadingComponent from '../../components/clipMakePage/upperContainer/LoadingComponent.jsx';
import ClipPreviewComponent from '../../components/clipMakePage/upperContainer/ClipPreviewComponent.jsx';

const MobileClipMake = () => {

  const { postId } = useParams();
  const [ images, setIamges ] = useState([])
  const [ isLoading, setIsLoading ] = useState(true)

  const changeImages = (newImages) => {
    setIamges(prevState => newImages)
  }

  const changeIsLoading = () => {
    setIsLoading(prev => !prev);
  }

  const getPostImages = async () => {
    const response = await GetAxiosInstance(`https://localhost:8443/file/image/${postId}`, {
      // TODO :: Post Image Get EndPoint 수정
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

  return  <TotalContainer>
    <MobileHeader />
    <InnerContainer>
      {
        isLoading ?
        <LoadingComponent
          images={images}
          isLoading={isLoading}
          changeIsLoading={changeIsLoading}
        /> :
        <ClipPreviewComponent
          images={images}
        />
      }
    </InnerContainer>
  </TotalContainer>
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