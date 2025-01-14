import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { PostAxiosInstance } from '../../../axios/AxiosMethod.js';
import styled from 'styled-components';

const TripTitleContainer = (props) => {
  const navigate = useNavigate();

  useEffect(() => {
  }, []);

  const submitPost = async (formData) => {
    props.handleChangeIsUploaded();
    const response = await PostAxiosInstance('https://localhost:8443/post', formData, {
      // TODO :: Post Regist EndPoint 수정
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response;
  };

  const submitClip = async (formData) => {
    const response = await PostAxiosInstance('https://localhost:8443/clip', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response;
  };

  const uploadPost = async () => {
    const postFormData = new FormData();
    postFormData.append("postTitle", props.tripInfo["tripTitle"]);
    postFormData.append("tripId", props.tripInfo["tripId"]);

    // newImages를 JSON 문자열로 변환하여 추가
    const newImagesJson = JSON.stringify(props.imageFiles.map(image => ({
      placeId: image.placeId,
      placeImageOrder: image.placeImageOrder
      // 파일은 별도로 추가
    })));
    postFormData.append("newImages", newImagesJson);

    // 모든 파일을 동일한 이름 'files'로 추가
    props.imageFiles.forEach((image) => {
      postFormData.append("files", image.img); // 파일을 동일한 필드명으로 추가
    });

    const postResponse = await submitPost(postFormData)

    if(postResponse.status === 200) {
      alert("post 추가 완료")
    } else console.log("post 추가 오류")
  };

  const generateClip = async () => {
    const clipFormData = new FormData();

    // TODO:: formData 일치화
    props.imageFiles.forEach((image) => {
      clipFormData.append("files", image.img); // 파일을 동일한 필드명으로 추가
      console.log(image.img);
    });

    const clipResponse = await submitClip(clipFormData)

    if(clipResponse.status === 200) {
      alert("clip 이미지 업로드 완료")
      navigate(`/clip/${clipResponse.data}/config`); // planId로 URL 변경
    } else console.log("clip 추가 오류")
  }

  return <>
    <TitleContainer>
      <InfoContainer>
        <TripDate>
          {props.tripInfo["tripStartDate"] == null || props.tripInfo["tripEndDate"] == null ? 'loading' : props.tripInfo["tripStartDate"].replace('-',".")
            + ' ~ '
            + props.tripInfo["tripEndDate"].replace('-',".")}
        </TripDate>
        <TripTitle>{props.tripInfo["tripTitle"] === null ? 'loading' : props.tripInfo["tripTitle"]}</TripTitle>
      </InfoContainer>
      <ButtonContainer>
        {props.isReady ?
          <>
            {props.isUploaded ?
              <BlackButton onClick={generateClip}>Clip Generate</BlackButton>
            :
              <BlackButton onClick={uploadPost}>Post Upload</BlackButton>
            }
          </>
        :
          <>
            <BlackButton onClick={props.handleChangeIsReady}>완료</BlackButton>
            <BlackButton>삭제</BlackButton>
          </>
        }
      </ButtonContainer>
    </TitleContainer>
  </>
}

export default TripTitleContainer

const TitleContainer = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
    gap: 1rem;
    padding: 0.5rem 1rem 0 1rem;
`

const InfoContainer = styled.div`
    display: flex;
    flex-direction: column;
`

const TripDate = styled.p`
    text-align: start;
    margin: 0;
`

const TripTitle = styled.p`
    // font-family
    font-size: 1.5rem;
    font-weight: bolder;
    text-align: start;
    margin: 0;
`

const ButtonContainer = styled.div`
    display: flex;
    gap: 0.5rem;
    padding: 0.5rem 0 0.5rem 0;
`

const BlackButton = styled.button`
    background-color: black;
    border: 0;
    border-radius: 0.5rem;
    padding: 0 1rem 0 1rem;
    height: 2.5rem;
    color: white;
`