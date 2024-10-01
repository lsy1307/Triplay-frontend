import { GetAxiosInstance } from '../../axios/AxiosMethod.js';
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import styled from 'styled-components';
import MobileHeader from '../../layout/MobileHeader.jsx';
import LoadingComponent from '../../components/clipMakePage/upperContainer/LoadingComponent.jsx';

const MobileClipMake = () => {

  const { postId } = useParams();
  const [ images, setIamges ] = useState([])
  const [ isLoading, setIsLoading ] = useState(true)

  const changeImages = (newImages) => {
    setIamges(prevState => [...prevState, newImages])
  }

  const changeIsLoading = () => {
    setIsLoading(prev => !prev);
  }

  const getPostImages = async () => {
    const response = await GetAxiosInstance(`https://localhost:8443/file/image/${postId}`, {
      // TODO :: Post Image Get EndPoint 수정
      headers: { 'Content-Type': 'application/json' },
    });
    return response;
  };

  useEffect(async () => {
    const response = await getPostImages();
    changeImages(response.data)
  }, []);

  useEffect(() => {
    console.log(images)
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
        <>
        </>
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