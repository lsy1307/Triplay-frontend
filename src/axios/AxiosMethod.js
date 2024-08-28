import axiosInstance from './AxiosInstance';

export const PostAxiosInstance = async (url, data, config) => {
  const res = await axiosInstance.post(url, data, config);
  return res;
};

export const GetAxiosInstance = async (url, config) => {
  const res = await axiosInstance.get(url, config);
  return res;
};

export const PatchAxiosInstance = async (url, data, config) => {
  const res = await axiosInstance.patch(url, data, config);
  return res;
};

export const DeleteAxiosInstance = async (url, config) => {
  const res = await axiosInstance.delete(url, config);
  return res;
};

export const PutAxiosInstance = async (url, data, config) => {
  const res = await axiosInstance.put(url, data, config);
  return res;
};


// 여행 지역 이름으로 지역 위치 정보 얻어오는 함수임
export const getLocationDataFromLocationName = async (searchLocation) => {
  const geocodeUrl =
    `https://maps.googleapis.com/maps/api/geocode/json` +
    `?address=${encodeURIComponent(searchLocation)}` +
    `&key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}`;

  try {
    const response = await axios.get(geocodeUrl);
    if (response.data.status === "OK") {
      const lat = response.data.results[0].geometry.location.lat;
      const lng = response.data.results[0].geometry.location.lng;
      const formatted_address = response.data.results[0].formatted_address;
      let res = {
        lat:lat,
        lng:lng,
        address:formatted_address
      }

      return res;
    } else {
      alert("지역을 찾을 수 없습니다.");
    }
  } catch (error) {
    console.error("Geocoding API 요청 중 오류 발생:", error);
  }
};


  // 여행 지역 이름으로 지역 상세 정보 얻어오는 함수임. 위에 함수보다 상위버전인데 api 호출을 2번 해야함.
  const getPlaceDataFromLocationName = async (searchLocation) => {
    const response = await fetch(`http://localhost:8080/place?location=${encodeURIComponent(searchLocation)}`);
    const data = await response.json();
    return data;
  };

  const addToLocationList = (data) => {
    setLocationList([...locationList, data]);
  }

  const changeLocationList = (data) => {
    setLocationList(data);
  }