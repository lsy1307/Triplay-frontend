import React, { useState } from 'react';
import Map from '../map/MyMap.jsx';


const UpperContainer = (props) => {
  const [coordinates, setCoordinates] = useState({ lat: -1, lng: -1 });
  const [markers, setMarkers] = useState([]);

  return <>
    <MapContainer>
      <MapWrapper>
        <Map
          selectedLat={coordinates.lat}
          selectedLng={coordinates.lng}
          locationList={props.locationList}
          markers={markers}
          isReArrange={props.isReArrange}
          setIsReArrange={props.setIsReArrange}
          selectedPlanDay={props.selectedPlanDay}
        />
      </MapWrapper>
    </MapContainer>
  </>
}

export default UpperContainer