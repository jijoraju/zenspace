import React, { useState ,useEffect,useCallback} from "react";
import { GoogleMap, Marker,useJsApiLoader } from "@react-google-maps/api";

const CustomMap = ({ center, zoom, markers, style ,mapStyle}) => {

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: MAP_API_KEY,
  })

  const [map, setMap] = useState(null)

  const onLoad = useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(center);
    /**
     * The function of map.fitBounds(bounds) is to automatically adjust the map's field of view based on the specified LatLngBounds object to ensure that the map area contained within this bounding box is visible. This is often useful when multiple markers or a specific area need to be displayed so that the user can see all markers or a specific geographic area.
    */
    // map.fitBounds(bounds);
    /**
     * setMap(map) is typically used to store a map object in the component's state so that further operations on the map can be performed later. In your code, these two lines of code are commented out, so they don't do anything.
    */
    setMap(map)
    // console.log('map',map)
  }, [center])

  // useEffect(()=>{
  //   onLoad()
  // },[onLoad,markers])
  
  const onUnmount = useCallback(function callback(map) {
    setMap(null)
  }, [])


  if(!markers) return 

  return (
    <div className={style}>
      {isLoaded ? (
        <GoogleMap
          mapContainerStyle={mapStyle}
          center={center}
          zoom={zoom}
          defaultZoom={zoom} 
          onLoad={onLoad}
          onUnmount={onUnmount}
        >
          {
            // markers.length && 
            markers.map((marker, index) => (
              <Marker
                key={index}
                position={marker.position}
                onClick={() => console.log('marker',marker)}
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

export default React.memo(CustomMap);
