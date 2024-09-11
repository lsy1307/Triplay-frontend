import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import PlusButtonSrc from '../../../assets/images/clipStartPage/ImagePlusButton.svg';


const UploadReadyContainer = (props) => {
  useEffect(() => {
    setImages()
  }, []);

  const handleFileChange = (event) => {
    const files = event.target.files;

    if (files.length > 0) {
      const file = files[0]; // 첫 번째 파일만 추가 (필요시 여러 파일 처리 가능)
      props.handleFileChange({
        day: 0,
        place: "",
        img: file
      }); // 부모의 addImage 함수 호출하여 Blob 추가
    }
  };

  return <>
    <FlexContainer>
      <GridContainer>
        {props.imageFile.map((file, index) => {
          const url = file.img instanceof File ? URL.createObjectURL(new Blob([file.img], { type: file.type })) : null;
          return <GridItem key={index}>
            <GridImage src={url} />
            <GridRemoveButton onClick={() => props.handleRemoveFile(index)}>X</GridRemoveButton>
          </GridItem>;
        })}
        <GridImagePlusInput id="file-upload" type="file" onChange={handleFileChange} />
        <GridImagePlusButton htmlFor="file-upload">
          <PlusButtonImage src={PlusButtonSrc}/>
        </GridImagePlusButton>
      </GridContainer>
    </FlexContainer>
  </>
}

export default UploadReadyContainer


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