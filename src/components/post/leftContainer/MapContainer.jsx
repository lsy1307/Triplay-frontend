import React from 'react';
import styled from 'styled-components';
import { GoogleMap, Marker } from '@react-google-maps/api';

const MapContainer = ({ isLoaded, places }) => {
    return (
        <MapWrapper>
            {isLoaded ? (
                <GoogleMap
                    mapContainerStyle={{ height: '100%', width: '100%' }}
                    center={places[0].location}
                    zoom={10}
                >
                    {places.map((place, index) => (
                        <Marker key={index} position={place.location} label={(index + 1).toString()} />
                    ))}
                </GoogleMap>
            ) : (
                <p>지도 로딩 중...</p>
            )}
        </MapWrapper>
    );
};

export default MapContainer;

const MapWrapper = styled.div`
    width: 100%;
    height: 60%;
    margin: 20px 0;
`;
