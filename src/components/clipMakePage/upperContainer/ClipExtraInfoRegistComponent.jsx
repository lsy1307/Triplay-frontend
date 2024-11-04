import React, { useState, useEffect, useRef } from 'react';
import { useNavigate} from 'react-router-dom';
import styled from 'styled-components';
import { PatchAxiosInstance } from '../../../axios/AxiosMethod';

const ClipExtraInfoRegistComponent = (props) => {
    const navigate = useNavigate();

    const [clipTitle, setClipTitle] = useState("")
    const [isOpened, setIsOpened] = useState(true);

    const submitClipExtraInfo = async (formData) => {
        const response = await PatchAxiosInstance(`https://localhost:8443/clip/${props.clipId}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        return response;
    };

    const registClipExtraInfo = async () => {
        const clipFormData = new FormData();
    
        // TODO:: formData 일치화
        clipFormData.append("clipTitle", clipTitle)
        clipFormData.append("isOpened", isOpened)
    
        const clipResponse = await submitClipExtraInfo(clipFormData)
    
        if(clipResponse.status === 200) {
          alert("clip 추가 정보 등록 완료")
          navigate(`/`); // 메인으로 이동
        } else console.log("clip 추가 정보 등록 오류")
      }

    // 클립 제목 변경 핸들러
    const handleClipTitleChange = (e) => {
        setClipTitle(e.target.value);  // 입력한 값으로 상태 업데이트
    };

    // 공개/비공개 여부 선택 핸들러
    const handleIsOpenedChange = (e) => {
        const value = e.target.value;
        setIsOpened(value === "public");  // 'public'이면 true, 'private'이면 false 설정
    };
    

    return (
        <TotalContainer>
            <MenuContainer>
                <MenuTitle>클립 추가 정보 입력</MenuTitle>
                <MenuButtonContainer>
                    <MenuButton backgroundColor='black' fontColor='white' onClick={registClipExtraInfo}>생성</MenuButton>
                </MenuButtonContainer>
            </MenuContainer>
            <InputTotalContainer>
                <InputContainer>
                    <InputName>클립 제목</InputName>
                    <TextInput value={clipTitle} onChange={handleClipTitleChange}></TextInput>
                </InputContainer>
                <InputContainer>
                    <InputName>클립 공개/비공개 여부</InputName>
                    <SelectInput onChange={handleIsOpenedChange}>
                        <option value="public">공개</option>
                        <option value="private">비공개</option>
                    </SelectInput>
                </InputContainer>
            </InputTotalContainer>
        </TotalContainer>
    );
}

const TotalContainer = styled.div`
    width: 100%;
    height: 100%;
    margin: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
`

const MenuContainer = styled.div`
    width: 100%;
    display: flex;
    padding: 1rem 1rem 1rem 1rem;
    justify-content: space-between;
    align-items: center;
`

const MenuTitle = styled.div`
    font-weight: bolder;
    font-size: x-large;
`

const MenuButtonContainer = styled.div`
    display: flex;
    gap: 1rem;
    justify-content: space-between;
    align-items: center;
`

const MenuButton = styled.button`
    padding: 0.5rem;
    border: black 0 solid;
    border-radius: 0.5rem;
    background-color: ${({backgroundColor}) => (backgroundColor)};
    color: ${({fontColor}) => (fontColor)};
`

const InputTotalContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 80%;
    gap: 1.5rem;
    padding: 1rem;
    border: 1px solid #393939;
    border-radius: 1rem;
`

const InputContainer = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
`

const InputName = styled.div`
    font-weight: bolder;
`

const TextInput = styled.input`

`

const SelectInput = styled.select`
`

export default ClipExtraInfoRegistComponent;