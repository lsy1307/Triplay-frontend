import { GetAxiosInstance } from '../axios/AxiosMethod';

export const getGooglePlaceDataByLocationName = async (searchLocation) => {
  const response = await GetAxiosInstance(
    `/getGooglePlaceData?location=${encodeURIComponent(searchLocation)}`,
  );
  return response;
};

// 여행 지역 이름으로 지역 상세 정보 얻어오는 함수임. 위에 함수보다 상위버전인데 api 호출을 2번 해야함.
export const getGooglePlaceDetailDataByLocationName = async (
  searchLocation,
) => {
  const response = await GetAxiosInstance(
    `/getGooglePlaceDetailData?location=${encodeURIComponent(searchLocation)}`,
  );
  return response;
};
