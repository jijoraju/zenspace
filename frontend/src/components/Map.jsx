import React, { useState ,useEffect} from "react";
import { GoogleMap, Marker,useJsApiLoader } from "@react-google-maps/api";

const containerStyle = {
  width: '100%',
  height: '70vh'
};

const CustomMap = ({ center, zoom, markers, style }) => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyClc1wLHC_CkGHCDy0OfsU0K2Eb-riKm0E",
  })

  const [map, setMap] = React.useState(null)

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);
    
    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])

  return (
    <div className={style}>
      {isLoaded ? (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={zoom}
          onLoad={onLoad}
          onUnmount={onUnmount}
        >
          {
          markers.map((marker, index) => (
            <Marker
              key={index}
              position={marker.position}
            />
          ))
          }
        </GoogleMap>
      ) : (
        <></>
      )}
    </div>
  );
};

export default CustomMap;
