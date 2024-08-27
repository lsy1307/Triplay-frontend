import React, { useEffect } from "react";
import { useState } from "react";
import {
  GoogleMap,
  Marker,
  useJsApiLoader,
} from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const SearchMap = ({ searchedCoordinates }) => {
  const { isLoaded, loadError } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });

  const [markers, setMarkers] = useState([]);

  const [coordinates, setCoordinates] = useState({lat: 37.5665, lng: 126.978}); // 위도 경도

  useEffect(() => {
    if (searchedCoordinates.lat !== -1 && searchedCoordinates.lng !== -1) {
      setCoordinates(searchedCoordinates);
      setMarkers([searchedCoordinates]);
    }
  }, [searchedCoordinates]);

  if (loadError) {
    return <div>Error loading maps</div>;
  }

  if (!isLoaded) {
    return <div>Loading Maps...</div>;
  }

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={{ lat: coordinates.lat, lng: coordinates.lng }}
      zoom={16}
      options={{
        disableDefaultUI: true, // 기본 UI 요소를 숨깁니다.
      }}
    >
      {markers.map((marker, idx) => (<Marker key={idx} position={marker} />))}
    </GoogleMap>
  );
};

export default React.memo(SearchMap);
