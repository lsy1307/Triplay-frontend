import React, {useState, useEffect} from 'react';
import styled from "styled-components";
import locations from "../../locations";

import {getGooglePlaceDataByLocationName} from "../../../api/tripInfo";

const TripLocationContentContainer = (props) => {

      /* 여행지 검색 입력값 */
      const [selectedLocation, setSelectedLocation] = useState("");

        // 입력된 여행지 검색값이 locations 배열에 존재하는지 확인 여부
    const [isInclude, setIsInclude] = useState(false);

      /* 여행지 검색 입력  */
      const onChangeLocationSearchinputHandler = (e) => {
        setSelectedLocation(e.target.value);
        const locationObject = locations.find(
        (location) => location.name === e.target.value
        );
        if (locationObject) {
        setIsInclude(true);
        } else {
        setIsInclude(false);
        }
    };

        /* 여행지 검색 입력하고 엔터 시 지도 띄울거임 */
    const onKeyDownHandler = async (e) => {
        if (e.key === "Enter") {
        const locationObject = locations.find(
            (location) => location.name === selectedLocation
        );
        if (locationObject) {
            props.setIsMapOn(true);
            const res = await getGooglePlaceDataByLocationName(locationObject.fullName);
            const coords = res.data.results[0].geometry.location;
            props.setCoordinates({ lat: coords.lat, lng: coords.lng });
        }
        }
    };

        // 여행 지역 카드 클릭시 selectedLocation 값 설정됨.
    const handleLocationChange = (location) => {
        setSelectedLocation(location);
    };

    useEffect(() => {},[isInclude]);

    return (
        <Container>
            <TripLocationSearchInput
            placeholder="여행지 검색"
            value={selectedLocation}
            onChange={onChangeLocationSearchinputHandler}
            onKeyDown={onKeyDownHandler}
            />
            <TripLocationsWrapper>
            {isInclude ? (
                <LocationCard
                  isselected="true"
                  onClick={() => handleLocationChange(selectedLocation)}
                >
                {selectedLocation}
                </LocationCard>
            ) : (
                locations.map((location, index) => {
                return (
                    <LocationCard
                      key={index}
                      isselected={`${selectedLocation === location.name}`}
                      onClick={() => handleLocationChange(location.name)}
                    >
                    {location.name}
                    </LocationCard>
                );
                })
            )}
            </TripLocationsWrapper>
        </Container>
    );
};

export default TripLocationContentContainer;

const Container = styled.div`
  width: 100%;
  height: 90%;
  display: flex;
  flex-direction: column;
`;

const TripLocationSearchInput = styled.input`
  border: 1px solid black;
  width: 10rem;
  height: 2rem;
  margin-left: 40px;
  margin-top: 30px;
  margin-bottom: 30px;
  border-radius: 10px;
  padding-left: 1rem;

  font-size: 1.5rem;
  &::placeholder {
    font-size: 1.5rem; /* placeholder 글자 크기 조절 */
    font-weight: 1000;
  }
`;

const TripLocationsWrapper = styled.div`
  width: 80%;
  height: 30%;
  margin-left: 40px;
  padding: 10px;
  overflow-y: auto; /* 스크롤이 생기도록 설정 */
  display: flex;
  flex-wrap: wrap; /* 여러 줄로 나열하기 위해 설정 */
  gap: 20px;

  /* 스크롤바를 보이지 않게 설정 */
  &::-webkit-scrollbar {
    display: none; /* 웹킷 기반 브라우저에서 스크롤바를 숨김 */
  }
  border: none;
`;

const LocationCard = styled.div`
  width: 6rem;
  height: 2rem;
  padding: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ isselected }) =>
    isselected === "true" ? "#d3d3d3" : "white"}; /* 선택된 상태 스타일링 */

  &:hover {
    background-color: #f0f0f0; /* 마우스 오버 시 스타일링 */
  }

  border: 1px solid black;

  border-radius: 15px;
`;