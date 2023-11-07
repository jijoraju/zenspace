import React, {useEffect, useState} from 'react'

// MUI
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';

// components
import CustomMap from "@components/Map";


function Map(props) {
    // if(!props?.mapData)return 
  const {description, mapData} = props
  const {latitude, longitude} = mapData

  const [mapLocation, setMapLocation] = useState({
    center: { lat:latitude, lng: longitude},
    zoom :15,
    markers:[
      { position: { lat:latitude, lng: longitude} },
    ],
  })

  if(!mapData && !mapLocation) return
  
  return (
    <div className='detailContainer-mapWrap'>

      <div className='detailContainer-mapWrap-title'>
        <LocationOnOutlinedIcon sx={{fontSize:24}} />
        <p>Office Space Address</p>
      </div>

      {
        mapData?.latitude && mapData?.longitude && 
        <CustomMap
          {...mapLocation}
          style={`detailContainer-mapWrap-map`}
          mapStyle={{width:'100%',height:311}}
        />
      }

      {/* description */}
      <p className='detailContainer-mapWrap-description'>{description}</p>
    </div>
  )
}

export default React.memo(Map)
