import { GetAxiosInstance } from '../../axios/AxiosMethod.js';
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const MobileClipMake = () => {

  const { postId } = useLocation().state || {};
  const [ images, setIamges ] = useState([])

  const getPostImages = async () => {
    const response = await GetAxiosInstance(`https://localhost:8080/file/image/${postId}`, {
      // TODO :: Post Image Get EndPoint 수정
      headers: { 'Content-Type': 'application/json' },
    });
    return response;
  };

  useEffect(async () => {
    const response = await getPostImages();
    console.log(response.data)
    setIamges(response.data.downloadLinks);
  }, []);

  return  <>
    {/*TODO :: 피그마 만들고 제작*/}
  </>
}

export default MobileClipMake