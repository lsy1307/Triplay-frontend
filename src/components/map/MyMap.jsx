import React, { useEffect } from "react";
import { useState } from "react";
import {
  GoogleMap,
  Marker,
  Polyline,
  useJsApiLoader,
} from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const MyMap = (props) => {
  const { isLoaded, loadError } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });

  const [lat, setLat] = useState(37.5665); // 위도
  const [lng, setLng] = useState(126.978); // 경도

  const [lines, setLines] = useState([]);


  useEffect(() => {
    if(props.markers.length > 0 && props.selectedPlanDay !== 0){
      setNewLines();
      setLat(props.markers[0].lat);
      setLng(props.markers[0].lng);
    }
    else {
      if (props.selectedLat !== -1) setLat(props.selectedLat);
      if (props.selectedLng !== -1) setLng(props.selectedLng);
    }
  },[props.markers, props.selectedLat, props.selectedLng]);

  useEffect(() => {
    if(props.isReArrange) {
      setNewLines();
    }
  },[props.isReArrange]);

  useEffect(() => {},[lines]);

  const setNewLines = () => {
    if(props.markers.length > 1){
      const newLines = [];
      for(let i=0;i<props.markers.length-1;i++){
        const f = props.markers[i];
        const s = props.markers[i+1];
        const newLine = {
          path: [f, s],
          options: {
            strokeColor: "#0000FF",
            strokeOpacity: 0.8,
            strokeWeight: 2,
            icons: [
              {
                icon: {
                  path: window.google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
                  scale: 3,
                  strokeColor: "#FF0000",
                },
                offset: "100%",
              },
            ],
          },
        };
        newLines.push(newLine);
      }
      setLines(newLines);
      props.setIsReArrange(false);
    }
    else {
      setLines([]);
    }
  }

  if (loadError) {
    return <div>Error loading maps</div>;
  }

  if (!isLoaded) {
    return <div>Loading Maps...</div>;
  }

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={{ lat: lat, lng: lng }}
      zoom={13}
      // onClick={handleMapClick}
    >
      {props.markers.map((marker, idx) => (
        <Marker key={idx} position={marker} />
      ))}
      {lines.map((line, idx) => (
        <Polyline key={idx} path={line.path} options={line.options} />
      ))}
    </GoogleMap>
  );
};

export default React.memo(MyMap);
