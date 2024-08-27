import React, { useState, useEffect } from "react";
import styled from "styled-components";
import 'bootstrap/dist/css/bootstrap.min.css';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faPlay, faBars, faEllipsis } from "@fortawesome/free-solid-svg-icons"; 

import AddPlanMapContainer from "./AddPlanMapContainer";



const AddPlanContainer = (props) => {
    const [PlanDropDownBoxes, setPlanDropDownBoxes] = useState([]);
    const [isAddPlanMapOn, setIsAddPlanMapOn] = useState(false);

    // 일정 추가 버튼 클릭 핸들러: 새로운 일정 박스를 추가
    const clickAddPlanBtnHandler = () => {
        const newPlanDropDownBox = {
            day: PlanDropDownBoxes.length + 1,
        };
        setPlanDropDownBoxes([...PlanDropDownBoxes, newPlanDropDownBox]);
    };

    // 드롭다운 박스 토글 핸들러: 드롭다운을 열거나 닫기
    const toggleDropdown = (data) => {
        props.setSelectedPlanDay(prevDay => prevDay === data.day ? 0 : data.day);
    };

    // 위치 검색 버튼 클릭 핸들러: 위치 검색 맵을 열기
    const clickSearchLocationBtnHandler = (e) => {
        e.stopPropagation();
        setIsAddPlanMapOn(true);
    };

    // 리스트를 재정렬하는 함수: 드래그 앤 드롭이 완료되었을 때 리스트의 순서를 업데이트
    const reorder = (saveList, startIndex, endIndex) => {
        const result = Array.from(saveList); // 원본 리스트를 복사
        console.log(startIndex, endIndex);

        const [movedItem] = result.splice(startIndex, 1); // 드래그된 항목을 제거
        result.splice(endIndex, 0, movedItem); // 새로운 위치에 드래그된 항목을 삽입

        // 인덱스 업데이트 (optional: 필요한 경우 각 요소의 idx를 업데이트)
        result.forEach((item, index) => {
            item.idx = index; // 인덱스를 기준으로 idx 값을 재설정
        });

        return result;
    };

    const findIndexInLocationList = (locationList, dayItem) => {
        return locationList.findIndex(location => location.idx === dayItem.idx);
    };

    // 드래그 앤 드롭이 끝났을 때 호출되는 함수: 리스트의 순서를 재정렬
    const onDragEnd = (result) => {
        if (!result.destination) {
            return;
        }

        const dayItems = props.locationList.filter((location) => location.planDay === props.selectedPlanDay);

        // source와 destination에 해당하는 item을 locationList에서 찾아 index를 얻음
        const sourceIndex = findIndexInLocationList(props.locationList, dayItems[result.source.index]);
        const destinationIndex = findIndexInLocationList(props.locationList, dayItems[result.destination.index]);

        const reorderedItems = reorder(props.locationList, sourceIndex, destinationIndex);
        
        props.setIsReArrange(true);
        props.changeLocationList(reorderedItems);
    };

    const onClickTripleDotHandler = () => {

    }

    return (
        <Container>
            <PlanContentsContainer>
                <PlanDropDownBoxContainer>
                    {PlanDropDownBoxes.map((planDay, index1) => (
                        <PlanDropDownBoxWrapper key={index1}>
                            <PlanDropDownBoxHeader onClick={() => toggleDropdown(planDay)}>
                                {planDay.day}일차
                                {
                                    planDay.day === props.selectedPlanDay && 
                                    <LocationSearchButton onClick={clickSearchLocationBtnHandler}>
                                        목적지 검색하기
                                    </LocationSearchButton>
                                }   
                                <ToggleIcon icon={faPlay} isopen={`${props.selectedPlanDay === planDay.day}`} />
                            </PlanDropDownBoxHeader>
                            <PlanDropDownBox isopen={`${props.selectedPlanDay === planDay.day}`}>
                                <DragDropContext onDragEnd={onDragEnd}>
                                    <Droppable droppableId={`droppable-${planDay.day}`}>
                                        {(provided) => (
                                            <PlanBoxesWrapper
                                                {...provided.droppableProps}
                                                ref={provided.innerRef}
                                                style={{maxHeight: "500px", overflowY: "auto" }}
                                            >
                                                {props.locationList
                                                    .filter(location => location.planDay === planDay.day)
                                                    .map((location, index2) => (
                                                        <Draggable 
                                                            key={location.idx.toString()} 
                                                            draggableId={location.idx.toString()} 
                                                            index={index2}
                                                        >
                                                            {(provided) => (
                                                                <PlanBox
                                                                    ref={provided.innerRef}
                                                                    {...provided.draggableProps}
                                                                    {...provided.dragHandleProps}
                                                                >
                                                                    <PlanBoxContentsWrapper>
                                                                        <PlanBoxUpperContentsContainer>
                                                                            <TripleDot icon={faEllipsis} onClick={onClickTripleDotHandler}></TripleDot>
                                                                        </PlanBoxUpperContentsContainer>
                                                                        <PlanBoxDownContentsContainer>
                                                                            <TripleBarWrapper>
                                                                                <TripleBar icon={faBars} />
                                                                            </TripleBarWrapper>             
                                                                            <TextContentsContainer>
                                                                                <LocationNameWrapper>
                                                                                    {location.locationName}
                                                                                </LocationNameWrapper>  
                                                                                <AddressWrapper>
                                                                                    {location.address}
                                                                                </AddressWrapper> 
                                                                            </TextContentsContainer>                                
                                                                            <ImageWrapper>
                                                                                <PlaceImg src={location.photoUrl} alt="" />    
                                                                            </ImageWrapper>  
                                                                        </PlanBoxDownContentsContainer>                                                                                                 
                                                                    </PlanBoxContentsWrapper>
                                                                </PlanBox>
                                                            )}
                                                        </Draggable>
                                                    ))}
                                                {provided.placeholder}
                                            </PlanBoxesWrapper>
                                        )}
                                    </Droppable>
                                </DragDropContext>
                            </PlanDropDownBox>
                            {isAddPlanMapOn && (
                                <AddPlanMapContainer
                                    planDay={props.selectedPlanDay}
                                    getLocationDataFromLocationName={props.getLocationDataFromLocationName}
                                    getPlaceDataFromLocationName={props.getPlaceDataFromLocationName}
                                    setIsAddPlanMapOn={setIsAddPlanMapOn}
                                    locationList={props.locationList}
                                    addToLocationList={props.addToLocationList}
                                />
                            )}
                        </PlanDropDownBoxWrapper>
                    ))}
                </PlanDropDownBoxContainer>
            </PlanContentsContainer>
            <AddPlanBtnWrapper>
                <AddPlanBtn onClick={clickAddPlanBtnHandler}>
                    일정 추가하기 <FontAwesomeIcon icon={faPlus} />
                </AddPlanBtn>
            </AddPlanBtnWrapper>
        </Container>
    );
};

export default AddPlanContainer;

const Container = styled.div`
  width: 100%;
  height: 92%;
  display: flex;
  flex-direction: column;
  margin-left: 2rem;
`;

const PlanContentsContainer = styled.div`
    width: 100%;
    max-height: 60%;
    margin-bottom: 1rem;
`;

const PlanDropDownBoxContainer = styled.div`
    width: 100%;
    height: 100%;
    overflow-y: auto;
`;

const PlanDropDownBoxWrapper = styled.div`
    margin-bottom: 1rem;
    background-color: #F4F4F4;
    border-radius: 1rem;
`;

const PlanDropDownBoxHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 3rem;
    padding: 0 1rem;
    font-weight: 1000;
`;

const ToggleIcon = styled(FontAwesomeIcon)`
    transform: ${({ isopen }) => (isopen === "true" ? 'rotate(90deg)' : 'rotate(270deg)')};
    transition: transform 0.3s ease;
`;

const LocationSearchButton = styled.button`
    font-size: 1.5rem;
    margin-right: 2rem;
    margin-left: auto;
    border-radius: 2rem;
`;

const PlanDropDownBox = styled.div`
    width: 100%;
    overflow-y: auto;
    max-height: ${({ isopen }) => (isopen === "true" ? "100%" : "0")};
    transition: ${({ isopen }) => (isopen === "true" ? "max-height 0.3s ease" : "none")};
`;

const PlanBoxesWrapper = styled.div`
    width: 100%;
`;

const PlanBox = styled.div`
    width: 95%;
    height:15rem;
    background-color: white;
    border-radius: 1rem;
    margin: 1rem auto;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
`;

const PlanBoxContentsWrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction:column;
    justify-content: center;
    align-items: center;
`;

const PlanBoxUpperContentsContainer = styled.div`
    width:100%;
    height:15%;
    display:flex;
    justify-content:end;
`

const TripleDot = styled(FontAwesomeIcon)`
    margin:0.8rem;
    margin-right:1.5rem;
    font-size:2rem;
`

const PlanBoxDownContentsContainer = styled.div`
    width:100%;
    height:85%;
    display:flex;
`

const TripleBarWrapper = styled.div`
    width: 10%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const TripleBar = styled(FontAwesomeIcon)`
    font-size: 3rem;
`;

const TextContentsContainer = styled.div`
    width: 60%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const LocationNameWrapper = styled.div`
    font-size: 3rem;
    font-weight: 1000;
    text-align:center;
`;

const AddressWrapper = styled.div``;

const ImageWrapper = styled.div`
    width: 30%;
    height: 80%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const PlaceImg = styled.img`
    width: 80%;
    height: 80%;
`;

const AddPlanBtnWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const AddPlanBtn = styled.button`
  width: 100%;
  background-color: white;
  color: black;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1rem;
  font-size: 2.5rem;
  font-weight: 700;
`;
