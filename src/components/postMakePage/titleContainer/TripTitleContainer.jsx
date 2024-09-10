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
    const response = await PostAxiosInstance('https://localhost:8080/post', formData, {
      // TODO :: Post Regist EndPoint 수정
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response;
  };

  const submitImages = async (formData) => {
    const response = await PostAxiosInstance(`https://localhost:8080/file/image/${postId}/new`, formData, {
      // TODO :: Post Update EndPoint 수정
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response;
  };

  const uploadPost = async () => {
    var postFormData = new FormData();
    postFormData.append("postTitle", props.postTitle)
    postFormData.append("postContent", props.postContent)
    postFormData.append("tripId", props.tripId)
    const postResponse = await submitPost(postFormData)
    if(postResponse.status === 200) {
      console.log(postResponse.data)
      setPostId(postResponse.data.postId);

      var imageFormData = new FormData();
      imageFormData.append("files", props.images);
      const imageResponse = await submitImages(imageFormData)
      if(imageResponse.status === 200) {
        console.log("postImage 저장 완료")
        // TODO :: 해당 이미지 파일들 정상적으로 저장되었음을 alert로 띄우기
      } else console.log("post image 저장 오류")
    } else console.log("post 추가 오류")
  };

  const moveToMakeClip = () => {
    navigate(`/trip/${props.tripId}/clip`); // planId로 URL 변경
  };

  return <>
    {props.isReady ?
      <TitleContainer>
        <InfoContainer>
          <TripDate>23.10.28 ~ 10.29</TripDate>
          <TripTitle>Trip to 태안</TripTitle>
        </InfoContainer>
        <ButtonContainer>
          <BlackButton onClick={uploadPost}>포스트 업로드</BlackButton>
          <BlackButton onClick={moveToMakeClip}>클립 만들기</BlackButton>
        </ButtonContainer>
      </TitleContainer>
    :
      <TitleContainer>
        <InfoContainer>
          <TripDate>23.10.28 ~ 10.29</TripDate>
          <TripTitle>Trip to 태안</TripTitle>
        </InfoContainer>
        <ButtonContainer>
          <BlackButton onClick={props.setIsReadyToTrue}>완료</BlackButton>
          <BlackButton>삭제</BlackButton>
        </ButtonContainer>
      </TitleContainer>
    }
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
    color: white;
`