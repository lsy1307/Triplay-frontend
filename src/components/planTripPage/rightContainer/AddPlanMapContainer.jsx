import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Form } from 'react-bootstrap';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { getPlaceDataFromLocationName } from '../../../api/tripInfo';
import SearchMap from '../../map/SearchMap';

const AddPlanMapContainer = (props) => {
  // 일정 추가하기 버튼 누르고, 뜬 맵에서 지역 검색했을 때 입력값
  const [searchedLocation, setSearchedLocation] = useState('');

  const [searchedCoordinates, setSearchedCoordinates] = useState({
    lat: -1,
    lng: -1,
  });

  const [locationName, setLocationName] = useState('');

  const [address, setAddress] = useState('');

  const [photoUrl, setPhotoUrl] = useState('');

  const [phoneNumber, setPhoneNumber] = useState(null);

  const [openData, setOpenData] = useState([]);

  const onSearchLocationChangeHandler = (e) => {
    setSearchedLocation(e.target.value);
  };

  const getPhotoUrl = (photoReference) => {
    return `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoReference}&key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}`;
  };

  const onClickSearchLocationBtnHandler = async (e) => {
    e.preventDefault();

    const placeData = await getPlaceDataFromLocationName(searchedLocation);
    let pos = {
      lat: placeData.data.result.geometry.location.lat,
      lng: placeData.data.result.geometry.location.lng,
    };
    setSearchedCoordinates(pos);

    let locationName = placeData.data.result.name;
    setLocationName(locationName);

    let address = placeData.data.result.formatted_address;
    setAddress(address);

    let photo = placeData.data.result.photos[0];
    setPhotoUrl(getPhotoUrl(photo.photo_reference));

    if (placeData.data.result.formatted_phone_number) {
      setPhoneNumber(placeData.result.formatted_phone_number);
    }

    if (placeData.data.result.opening_hours) {
      setOpenData(placeData.data.result.opening_hours.weekdat_text);
    }

    console.log(placeData);
  };

  const onClickAddToListBtnHandler = () => {
    const idx =
      props.locationList.length > 0
        ? props.locationList[props.locationList.length - 1].idx + 1
        : 0;
    const data = {
      idx: idx,
      planDay: props.planDay,
      lat: searchedCoordinates.lat,
      lng: searchedCoordinates.lng,
      address: address,
      locationName: locationName,
      photoUrl: photoUrl,
      phoneNumber: phoneNumber,
      openData: openData,
    };
    props.addToLocationList(data);
    props.setIsAddPlanMapOn(false);
  };

  return (
    <ModalOveraly>
      <ModalContent>
        <CloseButton
          onClick={() => {
            props.setIsAddPlanMapOn(false);
          }}
        >
          X
        </CloseButton>
        <AddPlanSearchContainer className="a">
          <AddPlanSearchWrapper>
            <Form className="d-flex">
              <AddPlanSearchInput onChange={onSearchLocationChangeHandler} />
              <AddPlanSearchBtn onClick={onClickSearchLocationBtnHandler}>
                <FontAwesomeIcon icon={faMagnifyingGlass} />
              </AddPlanSearchBtn>
            </Form>
          </AddPlanSearchWrapper>
          <AddToListBtn onClick={onClickAddToListBtnHandler}>
            내 장소에 추가
          </AddToListBtn>
        </AddPlanSearchContainer>
        <AddPlanMapWrapper>
          <SearchMap searchedCoordinates={searchedCoordinates} />
        </AddPlanMapWrapper>
      </ModalContent>
    </ModalOveraly>
  );
};

export default AddPlanMapContainer;

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
  justify-content: center;
  align-items: center;
`;

const CloseButton = styled.button`
  align-self: flex-end;
  font-size: 1.5rem;
  font-weight: 1000;
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
  margin-left: 8rem;
`;

const AddPlanSearchInput = styled.input`
  border-radius: 1.5rem 0 0 1.5rem;
  padding: 0 15px;
  font-size: 1.5rem;
  flex-grow: 1;
  border-right: none;
  height: 3rem;

  &:focus {
    outline: none;
    box-shadow: none;
  }
`;

const AddPlanSearchBtn = styled.button`
  border-radius: 0 25px 25px 0;
  border-left: none;
  padding: 10px 20px;
  height: 3rem;
  font-size: 1.2rem;
  border-left: none;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const AddToListBtn = styled.button`
  font-size: 1rem;
  border-radius: 0.8rem;
  background-color: black;
  color: white;
  height: 80%;
  width: 15%;
  margin-left: auto;
`;

const AddPlanMapWrapper = styled.div`
  width: 100%;
  height: 100%;
`;
