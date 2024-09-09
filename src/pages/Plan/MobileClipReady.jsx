import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import { PostAxiosInstance } from '../../axios/axios.method';
import PlusButtonSrc from '../../assets/images/clipStartPage/ImagePlusButton.svg'; // 경로 수정

const MobileClipReady = ({ postTitle, postContent, postContentinitialImages }) => {
  const navigate = useNavigate();
  const [postId, setPostId] = useState(0)
  const [images, setImages] = useState(initialImages);
  const { tripId } = useParams(); // URL에서 planId 가져오기

  useEffect(() => {
    setImages(initialImages)
  }, [initialImages]);

  const submitPost = async (formData) => {
    const response = await PostAxiosInstance('https://localhost:8080/post', formData, { // TODO :: Post Regist EndPoint 수정
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response;
  };

  const submitImages = async (formData) => {
    const response = await PostAxiosInstance(`https://localhost:8080/file/image/${postId}/new`, formData, { // TODO :: Post Update EndPoint 수정
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response;
  };

  const moveToUploadPost = async () => {
    var postFormData = new FormData();
    postFormData.append("postTitle", postTitle)
    postFormData.append("postContent", postContent)
    postFormData.append("tripId", planId)
    const postResponse = await submitPost(postFormData)
    if(postResponse.status === 200) {
      console.log(postResponse.data)
      setPostId(postResponse.data.postId);

      var imageFormData = new FormData();
      imageFormData.append("files", images);
      const imageResponse = await submitPost(postFormData)
      if(imageResponse.status === 200) {
        console.log("postImage 저장 완료")
        // TODO :: 해당 이미지 파일들 정상적으로 저장되었음을 alert로 띄우기
      } else console.log("post image 저장 오류")
    } else console.log("post 추가 오류")
  };

  const moveToMakeNewClip = () => {
    navigate(`/clip/make`, { state:{ postId: postId }}); // planId로 URL 변경
  };

  return <div>
    <div className="Header"></div>
    <TotalContainer>
      <TitleContainer>
        <InfoContainer>
          <TripDate>23.10.28 ~ 10.29</TripDate>
          <TripTitle>Trip to 태안</TripTitle>
        </InfoContainer>
        <ButtonContainer>
          <BlacKButton onClick={moveToUploadPost}>Post Upload</BlacKButton>
          <BlacKButton onClick={moveToMakeNewClip}>Make a Video</BlacKButton>
        </ButtonContainer>
      </TitleContainer>
      <FlexContainer>
        <GridContainer>
          {images.map((image, index) => {
            const url = image instanceof Blob ? URL.createObjectURL(image) : null;
            return <GridItem key={index}>
              <GridImage src={url} />
              <GridRemoveButton onClick={() => handleRemoveImage(index)}>X</GridRemoveButton>
            </GridItem>;
          })}
          <GridImagePlusInput id="file-upload" type="file" multiple onChange={handleFileChange} />
          <GridImagePlusButton htmlFor="file-upload">
            <PlusButtonImage src={PlusButtonSrc}/>
          </GridImagePlusButton>
        </GridContainer>
      </FlexContainer>
    </TotalContainer>
    <div className="Footer"></div>
  </div>
}

export default MobileClipReady

const TotalContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
`

const TitleContainer = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 1rem;
    padding: 1rem;
`

const InfoContainer = styled.div`
    display: flex;
    flex-direction: column;
`

const TripDate = styled.p`
    // font-family
    // font-size
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
    gap: 0.1rem;
    padding: 0.5rem 0 0.5rem 0;
`

const BlacKButton = styled.button`
    background-color: black;
    border: 0;
    border-radius: 0.5rem;
    color: white;
`

const FlexContainer = styled.div`
    width:90%;
    display:flex;
    justify-content:center;
    margin: 0 auto;
`

const GridContainer = styled.div`
    width: 30em;
    display: flex;
    flex-wrap: wrap;
    overflow-y: auto;
    gap: 0.75em;
    justify-content: left;
`;

const GridItem = styled.div`
    position: relative;
    width: 7em;
    height: 10em;
`

const GridImage = styled.img`
    width: 7em;
    height: 10em;
    background-color: #f0f0f0;
    border: 1px solid #ccc;
    text-align: center;
`;

const GridRemoveButton = styled.button`
    position: absolute;
    top: 0.5em;
    right: 0.5em;
    background-color: #e3e3e3;
    border-radius: 3em;
    border: 0;
    color: black;
`

const GridImagePlusInput = styled.input`
    display: none;
`

const GridImagePlusButton = styled.label`
    border: 0.2rem solid #898989;
    width: 7em;
    height: 10em;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    background-size: cover;
`

const PlusButtonImage = styled.img`
    max-width: 100%;
    max-height: 100%;
`