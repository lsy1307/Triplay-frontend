import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { PostAxiosInstance } from '../../../axios/AxiosMethod.js';
import styled from 'styled-components';

const TripTitleContainer = (props) => {
  const navigate = useNavigate();
  const [postId, setPostId] = useState(0)

  useEffect(() => {
  }, []);

  const submitPost = async (formData) => {
    const response = await PostAxiosInstance('https://localhost:8443/post', formData, {
      // TODO :: Post Regist EndPoint 수정
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response;
  };

  const uploadPost = async () => {
    var postFormData = new FormData();
    postFormData.append("postTitle", props.tripInfo["tripTitle"])
    // postFormData.append("postContent", props.postContent)
    postFormData.append("tripId", props.tripInfo["tripId"])
    postFormData.append("newImages", props.imageFiles)
    const postResponse = await submitPost(postFormData)
    if(postResponse.status === 200) {
      alert("post 추가 완료")
      navigate('/post')
    } else console.log("post 추가 오류")
  };

  const moveToMakeClip = () => {
    navigate(`/trip/${props.tripId}/clip`); // planId로 URL 변경
  };

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
            <BlackButton onClick={uploadPost}>Upload</BlackButton>
            <BlackButton onClick={moveToMakeClip}>Clip</BlackButton>
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