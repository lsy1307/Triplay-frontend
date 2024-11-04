import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import PlusButtonSrc from '../../../assets/images/clipStartPage/ImagePlusButton.svg';

const ClipImageUploadComponent = (props) => {

    const [count, setCount] = useState(0)

    const handleFileChange = (event) => {
        const files = event.target.files;
        if (files.length > 0) {
            const file = files[0]; // 첫 번째 파일만 추가
            props.handleFileChange({
                placeId: 0,
                placeImageOrder: count,
                img: file
            });
        }
        setCount(prevCount => prevCount + 1);
    };

    return <>
        <TotalContainer>
            {props.imageFiles.map((file, index) => {
            const url = file.img instanceof File ? URL.createObjectURL(new Blob([file.img])) : null;
            return <ItemWrapper key={index}>
                <ItemImage src={url} />
                <ItemRemoveButton onClick={() => props.handleRemoveFile(index)}>
                    <ItemRemoveSvg icon={faXmark}></ItemRemoveSvg>
                </ItemRemoveButton>
                </ItemWrapper>;
            })}
            <ImagePlusButton>
                <ImagePlusInput type="file" onChange={handleFileChange} />
                <PlusButtonImg src={PlusButtonSrc}/>
            </ImagePlusButton>
        </TotalContainer>
    </>
}

export default ClipImageUploadComponent;

const TotalContainer = styled.div`
    padding: 1rem;
    display: flex;
    gap: 1rem;
    width: 100%;  // 필요에 따라 너비를 지정
    height: auto; // 높이는 필요에 맞게 지정
    flex-wrap: wrap;  // 줄바꿈을 허용

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
    width: 6em;
    position: relative;
`

const ItemImage = styled.img`
    width: 6em;
    height: 8.4em;
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
    width: 6em;
    height: 8.4em;
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