import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faPlay, faBars, faEllipsis } from "@fortawesome/free-solid-svg-icons";

import AddPlanMapContainer from "./AddPlanMapContainer";
import EditPlanMapContainer from "./EditPlanMapContainer";

const AddPlanContainer = (props) => {
  const [PlanDropDownBoxes, setPlanDropDownBoxes] = useState([]);
  const [isAddPlanMapOn, setIsAddPlanMapOn] = useState(false);
  const [isEditPlanMapOn, setIsEditPlanMapOn] = useState(false);
  const [openDropdownIndex, setOpenDropdownIndex] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState({});

  // 기본값 처리
  const locationList = props.locationList || [];

  // Initialize existing plans
  useEffect(() => {
    if (locationList.length > 0) {
      const existingDays = [...new Set(locationList.map((location) => location.planDay))];
      const initialDropDownBoxes = existingDays.map((day) => ({ day }));
      setPlanDropDownBoxes(initialDropDownBoxes);
    }
  }, [locationList]);

  const clickAddPlanBtnHandler = () => {
    const newPlanDropDownBox = {
      day: PlanDropDownBoxes.length + 1,
    };
    setPlanDropDownBoxes([...PlanDropDownBoxes, newPlanDropDownBox]);
  };

  const toggleDropdown = (data) => {
    props.setSelectedPlanDay((prevDay) => (prevDay === data.day ? 0 : data.day));
  };

  const clickSearchLocationBtnHandler = (e) => {
    e.stopPropagation();
    setIsAddPlanMapOn(true);
  };

  const reorder = (saveList, startIndex, endIndex) => {
    const result = Array.from(saveList);

    const [movedItem] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, movedItem);

    result.forEach((item, index) => {
      item.idx = index;
    });

    return result;
  };

  const findIndexInLocationList = (locationList, dayItem) => {
    return locationList.findIndex((location) => location.idx === dayItem.idx);
  };

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const dayItems = locationList.filter((location) => location.planDay === props.selectedPlanDay);

    const sourceIndex = findIndexInLocationList(locationList, dayItems[result.source.index]);
    const destinationIndex = findIndexInLocationList(locationList, dayItems[result.destination.index]);

    const reorderedItems = reorder(locationList, sourceIndex, destinationIndex);

    props.setIsReArrange(true);
    props.changeLocationList(reorderedItems);
    setOpenDropdownIndex(-1);
  };

  const onClickTripleDotHandler = (index) => {
    setOpenDropdownIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const handleEditClick = (location) => {
    setSelectedPlan(location);
    setIsEditPlanMapOn(true);
    setOpenDropdownIndex(-1);
  };

  const handleDeleteClick = (location) => {
    const foundIndex = locationList.findIndex(
      (foundLocation) => foundLocation.planDay === location.planDay && foundLocation.idx === location.idx
    );
    const updatedLocationList = [
      ...locationList.slice(0, foundIndex),
      ...locationList.slice(foundIndex + 1),
    ];

    props.changeLocationList(updatedLocationList);
    props.setIsReArrange(true);
    setOpenDropdownIndex(-1);
  };

  return (
    <Container>
      <PlanContentsContainer>
        <PlanDropDownBoxContainer>
          {PlanDropDownBoxes.map((planDay, index1) => (
            <PlanDropDownBoxWrapper key={index1}>
              <PlanDropDownBoxHeader onClick={() => toggleDropdown(planDay)}>
                {planDay.day}일차
                {planDay.day === props.selectedPlanDay && (
                  <LocationSearchButton onClick={clickSearchLocationBtnHandler}>
                    목적지 검색하기
                  </LocationSearchButton>
                )}
                <ToggleIcon icon={faPlay} isopen={`${props.selectedPlanDay === planDay.day}`} />
              </PlanDropDownBoxHeader>
              <PlanDropDownBox isopen={`${props.selectedPlanDay === planDay.day}`}>
                <DragDropContext onDragEnd={onDragEnd}>
                  <Droppable droppableId={`droppable-${planDay.day}`}>
                    {(provided) => (
                      <PlanBoxesWrapper
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        style={{ maxHeight: "500px", overflowY: "auto" }}
                      >
                        {locationList
                          .filter((location) => location.planDay === planDay.day)
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
                                      <TripleDot
                                        icon={faEllipsis}
                                        onClick={() => onClickTripleDotHandler(index2)}
                                      />
                                      {openDropdownIndex === index2 && (
                                        <DropdownMenu>
                                          <DropdownItem onClick={() => handleEditClick(location)}>
                                            수정하기
                                          </DropdownItem>
                                          <DropdownItem onClick={() => handleDeleteClick(location)}>
                                            삭제하기
                                          </DropdownItem>
                                        </DropdownMenu>
                                      )}
                                    </PlanBoxUpperContentsContainer>
                                    <PlanBoxDownContentsContainer>
                                      <TripleBarWrapper>
                                        <TripleBar icon={faBars} />
                                      </TripleBarWrapper>
                                      <TextContentsContainer>
                                        <LocationNameWrapper>
                                          {location.locationName}
                                        </LocationNameWrapper>
                                        <AddressWrapper>{location.address}</AddressWrapper>
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
                  setIsAddPlanMapOn={setIsAddPlanMapOn}
                  locationList={locationList}
                  addToLocationList={props.addToLocationList}
                />
              )}
              {isEditPlanMapOn && (
                <EditPlanMapContainer
                  locationList={locationList}
                  setIsEditPlanMapOn={setIsEditPlanMapOn}
                  selectedPlan={selectedPlan}
                  changeLocationList={props.changeLocationList}
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
  margin-left: 0.5 rem;
`;

const PlanContentsContainer = styled.div`
    width: 100%;
    max-height: 80%;
    margin-bottom: 1rem;
`;

const PlanDropDownBoxContainer = styled.div`
    width: 100%;
    height: 100%;
    overflow-y: auto;
    padding-right: 0.5rem;
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
    font-size: 1.8rem;
    padding: 0.8rem 1rem;
    font-weight: 600;
    cursor: pointer;
`;

const ToggleIcon = styled(FontAwesomeIcon)`
    transform: ${({ isopen }) => (isopen === "true" ? 'rotate(90deg)' : 'rotate(270deg)')};
    transition: transform 0.3s ease;
`;

const LocationSearchButton = styled.button`
    font-size: 1.2rem;
    padding: 0.4rem 1.2rem;
    margin-right: -22rem;
    border-radius: 1rem;
    background-color: #000;
    color: white;
    border: none;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
        background-color: #388E3C;
    }
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
    height: 14rem;
    background-color: white;
    border-radius: 1rem;
    margin: 1rem auto;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const PlanBoxContentsWrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 1rem;
`;

const PlanBoxUpperContentsContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
`;

const TripleDot = styled(FontAwesomeIcon)`
    font-size: 1.5rem;
    color: #888;
    cursor: pointer;
`;

const DropdownMenu = styled.div`
    position: absolute;
    top: 2.5rem;
    right: 1.5rem;
    background-color: white;
    border-radius: 0.5rem;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    z-index: 1000;
    min-width: 8rem;
`;

const DropdownItem = styled.div`
    padding: 1.2rem;
    font-size: 1.4rem;
    color: #333;
    cursor: pointer;
    &:hover {
        background-color: #f4f4f4;
    }
`;

const PlanBoxDownContentsContainer = styled.div`
    display: flex;
    align-items: center;
`;

const TripleBarWrapper = styled.div`
    margin-right: 1rem;
`;

const TripleBar = styled(FontAwesomeIcon)`
    font-size: 1.2rem;
    color: #888;
`;

const TextContentsContainer = styled.div`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
`;

const LocationNameWrapper = styled.div`
    font-size: 1.6rem;
    font-weight: 600;
`;

const AddressWrapper = styled.div`
    font-size: 1.2rem;
    color: #555;
`;

const ImageWrapper = styled.div`
    width: 25%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const PlaceImg = styled.img`
    width: 80%;
    height: 80%;
    border-radius: 8px;
`;

const AddPlanBtnWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 1rem;
`;

const AddPlanBtn = styled.button`
  width: 30%;
  background-color: #000;
  color: white;
  font-size: 1.2rem;
  padding: 0.8rem;
  border-radius: 8px;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
      background-color: #388E3C;
  }
`;

const CompletePlanBtnWrapper = styled.div`
    margin-top: 1rem;
    text-align: center;
`;