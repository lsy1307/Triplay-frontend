import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";

import { Input } from 'antd';
const { Search } = Input;

import SearchMap from "../../map/SearchMap";

import { getGooglePlaceDetailDataByLocationName } from "../../../api/tripInfo";

const EditPlanMapContainer = (props) => {

    // 일정 추가하기 버튼 누르고, 뜬 맵에서 지역 검색했을 때 입력값
    const [searchedLocation, setSearchedLocation] = useState("");

    const [searchedCoordinates, setSearchedCoordinates] = useState({
        lat: -1,
        lng: -1,
    });

    const [locationName, setLocationName] = useState("");
    
    const [address, setAddress] = useState("");

    const [photoUrl, setPhotoUrl] = useState("");

    const [phoneNumber, setPhoneNumber] = useState(null);

    const [openData, setOpenData] = useState([]);

    const onSearchLocationChangeHandler = (e) => {
        setSearchedLocation(e.target.value);
    };

    const getPhotoUrl = (photoReference) => {
      return `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoReference}&key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}`;
   };

    const onClickSearchLocationBtnHandler = async () => {
        const placeData = await getGooglePlaceDetailDataByLocationName(searchedLocation); 
        const placeDataResult = placeData.data.result;
        let pos = {lat:placeDataResult.geometry.location.lat, lng:placeDataResult.geometry.location.lng};
        setSearchedCoordinates(pos);

        let locationName = placeDataResult.name;
        setLocationName(locationName);

        if(placeDataResult.formatted_address){
          let address = placeDataResult.formatted_address;
          setAddress(address);
        }

        if(placeDataResult.photos) {
          let photo = placeDataResult.photos[0];
          setPhotoUrl(getPhotoUrl(photo.photo_reference));
        }

        if(placeDataResult.formatted_phone_number){
          setPhoneNumber(placeDataResult.formatted_phone_number);
        }

        if(placeDataResult.opening_hours){
          setOpenData(placeDataResult.opening_hours.weekday_text);
        }
    };

    const onClickEditBtnHandler = () => {
      const foundIndex = props.locationList.findIndex(location => 
        location.planDay === props.selectedPlan.planDay && location.idx === props.selectedPlan.idx
      );

      if (foundIndex !== -1) { 
          const updatedLocation = {
              ...props.locationList[foundIndex], 
              lat: searchedCoordinates.lat,
              lng: searchedCoordinates.lng,
              address: address,
              locationName: locationName,
              photoUrl: photoUrl,
              phoneNumber: phoneNumber,
              openData: openData
          };

          const updatedLocationList = [
              ...props.locationList.slice(0, foundIndex),
              updatedLocation,
              ...props.locationList.slice(foundIndex + 1)
          ];

          props.changeLocationList(updatedLocationList);
          props.setIsEditPlanMapOn(false);
      } else {
          console.log("Location not found");
      }
    }

    useEffect(() => {
      setSearchedLocation(props.selectedPlan.locationName);
      setSearchedCoordinates({lat:props.selectedPlan.lat, lng:props.selectedPlan.lng});
    }, [props.selectedPlan]);

    return (
        <ModalOveraly>
          <ModalContent>
            <CloseButton onClick={() => {props.setIsEditPlanMapOn(false)}}>X</CloseButton>   
            <AddPlanSearchContainer className="a">
              <AddPlanSearchWrapper>
              <StyledSearch
                onChange={onSearchLocationChangeHandler}
                onSearch={onClickSearchLocationBtnHandler}
              />
              </AddPlanSearchWrapper>
              <AddToListBtn onClick={onClickEditBtnHandler}>수정하기</AddToListBtn>
            </AddPlanSearchContainer>
            <AddPlanMapWrapper>
              <SearchMap searchedCoordinates={searchedCoordinates}/>
            </AddPlanMapWrapper>
          </ModalContent>
        </ModalOveraly>
    );
};

export default EditPlanMapContainer;

const ModalOveraly = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
    background: white;
    width: 60%;
    height: 80%;
    border-radius: 10px;
    padding: 2rem 3rem;
    display: flex;
    flex-direction: column;
    justify-content:center;
    align-items:center;
`

const CloseButton = styled.button`
    align-self: flex-end;
    font-size: 1.5rem;
    font-weight:1000;
    border: none;
    background: none;
    cursor: pointer;
`;

const AddPlanSearchContainer = styled.div`
  width: 100%;
  height: 10%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const AddPlanSearchWrapper = styled.div`
  width: 70%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left:8rem;
`;

const StyledSearch = styled(Search)`
  width: 70%; 

  .ant-input {
    height: 2vw; 
    font-size: 1.5vw; 
  }

  .ant-input-search-button {
    width: 4vw;  
    height: 2vw;
  }
`;

const AddToListBtn = styled.button`
  font-size:1rem;
  border-radius:0.8rem;
  background-color:black;
  color:white;
  height:80%;
  width:15%;
  margin-left:auto;
`

const AddPlanMapWrapper = styled.div`
  width: 100%;
  height: 100%;
`;