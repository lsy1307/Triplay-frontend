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
  const [ videoUrl, setVideoUrl ] = useState('')

  const changeImages = (newImages) => {
    setIamges(prevState => [...prevState, newImages])
  }

  const changeIsLoading = () => {
    setIsLoading(prev => !prev);
  }

  const getPostImages = async () => {
    const response = await GetAxiosInstance(`https://localhost:8443/file/image/blob/${postId}`, {
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

  return  <>
    <MobileHeader />
    <TotalContainer>
      {
        isLoading ?
        <LoadingComponent
          images={images}
          isLoading={isLoading}
          changeIsLoading={changeIsLoading}
        /> :
        <ClipPreviewComponent
          images={images}
          videoUrl={videoUrl}
          setVideoUrl={setVideoUrl}
        />
      }
    </TotalContainer>
  </>
}

export default MobileClipMake

const TotalContainer = styled.div`
  width: 100%;
  height: 100%;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`