import styled, {keyframes} from 'styled-components';
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import PlusButtonSrc from '../../../assets/images/clipStartPage/ImagePlusButton.svg';

const TripPlaceContainer = (props) => {

  const [placeImageFiles, setPlaceImageFiles] = useState([])
  const [count, setCount] = useState(0);

  const handlePlaceFileChange = (newImageFile) => {
    setPlaceImageFiles((prevImageFiles) => [...prevImageFiles, newImageFile]);
  }

  const handlePlaceRemoveFile = (index) => {
    setPlaceImageFiles((prevImageFiles) => prevImageFiles.filter((_, i) => i !== index))
    props.handleRemoveFile(index)
  }

  const handleDeleteClick = (location) => {
    const foundIndex = props.locationList.findIndex(foundLocation =>
      foundLocation.planDay === location.planDay && foundLocation.idx === location.idx
    );
    const updatedLocationList = [
      ...props.locationList.slice(0, foundIndex),
      ...props.locationList.slice(foundIndex + 1)
    ];

    props.changeLocationList(updatedLocationList);
  };

  const handleFileChange = (event) => {
    const files = event.target.files;

    if (files.length > 0) {
      const file = files[0]; // 첫 번째 파일만 추가 (필요시 여러 파일 처리 가능)
      handlePlaceFileChange({
        img: file
      })
      props.handleFileChange({
        placeId: props.location.placeId,
        img: file
      }); // 부모의 addImage 함수 호출하여 Blob 추가
    }
  };

  useEffect(() => {
    console.log(placeImageFiles);
  },[placeImageFiles])

  return <PlaceContainer>
    <PlaceHeader>
      <LocationInfo>
        <LocationName>{props.location.locationName}</LocationName>
        <LocationAddress>{props.location.address}</LocationAddress>
      </LocationInfo>
      <EditButton icon={faXmark} onClick={() => handleDeleteClick(props.location)}></EditButton>
    </PlaceHeader>
    <PlaceBodyWrapper>
      <PlaceBody>
        {placeImageFiles.map((file, index) => {
          const url = file.img instanceof File ? URL.createObjectURL(new Blob([file.img])) : null;
          return <ItemWrapper key={index}>
            <ItemImage src={url} />
            <ItemRemoveButton onClick={() => handlePlaceRemoveFile(index)}>
              <ItemRemoveSvg icon={faXmark}></ItemRemoveSvg>
            </ItemRemoveButton>
          </ItemWrapper>;
        })}
        <ImagePlusButton>
          <ImagePlusInput type="file" onChange={handleFileChange} />
          <PlusButtonImg src={PlusButtonSrc}/>
        </ImagePlusButton>
      </PlaceBody>
    </PlaceBodyWrapper>
  </PlaceContainer>
}

export default TripPlaceContainer

const PlaceContainer = styled.div`
    border-radius: 0.5rem;
    background-color: #d5d5d5;
`

const PlaceHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.5rem;
`

const LocationInfo = styled.div`

`

const LocationName = styled.div`
  font-weight: bold;
`

const LocationAddress = styled.div`
  
`

const EditButton = styled(FontAwesomeIcon)`
    width: 1.5rem;
    height: 1.5rem;
`

const PlaceBodyWrapper = styled.div`
    padding: 0.5rem;
`

const PlaceBody = styled.div`
    display: flex;
    overflow-x: auto;  // 가로 스크롤을 허용
    gap: 1rem;
    white-space: nowrap;  // 요소들이 한 줄에 나오게 함
    width: 100%;  // 필요에 따라 너비를 지정
    height: auto; // 높이는 필요에 맞게 지정

    &::-webkit-scrollbar {
        height: 0.5rem; // 스크롤바 높이
    }

    &::-webkit-scrollbar-thumb {
        background-color: #888; // 스크롤바 색상
        border-radius: 0.2rem;    // 스크롤바 둥글게
    }

    &::-webkit-scrollbar-thumb:hover {
        background-color: #555; // 스크롤바 hover 색상
    }
`

const ItemWrapper = styled.div`
    flex: 0 0 auto;  // 아이템이 줄 바꿈 없이 한 줄에 나오도록
    border: 1px solid #ccc;
    width: 7em;
    position: relative;
`

const ItemImage = styled.img`
    width: 7em;
    height: 10em;
`;

const ItemRemoveButton = styled.button`
    position: absolute;
    top: 0.5em;
    right: 0.5em;
    width: 1.2rem;
    height: 1.2rem;
    padding: 0.2rem;
    background-color: #e3e3e3;
    border-radius: 3em;
    border: 0;
    color: black;
    
    display: flex;
    justify-content: center;
    align-items: center;
`

const ItemRemoveSvg = styled(FontAwesomeIcon)`
    height: 1rem;
    width: 1rem;
`

const ImagePlusInput = styled.input`
    display: none;
`

const ImagePlusButton = styled.label`
    border: 0.2rem solid #898989;
    width: 7em;
    height: 10em;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    background-size: cover;
    flex-shrink: 0;  // 너비가 줄어들지 않도록 고정
`

const PlusButtonImg = styled.img`
    max-width: 100%;
    max-height: 100%;
`