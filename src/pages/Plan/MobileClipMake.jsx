import { GetAxiosInstance } from '../../axios/AxiosMethod.js';
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';

const MobileClipMake = () => {

  const { postId } = useParams();
  const [ images, setIamges ] = useState([])

  const changeImages = (newImages) => {
    setIamges(prevState => [...prevState, newImages])
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
    console.log(response.data)
  }, []);

  return  <>
    {/*TODO :: 피그마 만들고 제작*/}
  </>
}

export default MobileClipMake