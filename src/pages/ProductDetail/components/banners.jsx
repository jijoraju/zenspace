import React, { useState , useEffect} from "react";

import PhotoAlbum from "react-photo-album";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Slideshow from "yet-another-react-lightbox/plugins/slideshow";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/plugins/thumbnails.css";

// components
// import Image from "@components/Images";

function Banners(props) {

  const [index, setIndex] = useState(-1);
  const [photos, setPhotos] = useState(null); 
  const { bannerData } = props;

  useEffect(()=>{

    const photosHandler = () =>{
     const imgs =  bannerData.map((item)=>({
        src: item,
        width: 1080,
        height: 800,
        srcSet: [
          { src: item, width: 1080, height: 800 },
          { src: item, width: 1080, height: 800 },
        ],
      }))

      setPhotos(imgs)
      console.log('photos',photos)
    }

    photosHandler()
  },[bannerData])


  return (
    <div className="bannerContainer">
      {
        photos?.length ?
        <>
          <PhotoAlbum
            layout="rows"
            photos={photos}
            targetRowHeight={150}
            onClick={({ index }) => setIndex(index)}
          />

          <Lightbox
            index={index}
            open={index >= 0}
            slides={photos}
            close={() => setIndex(-1)}
            plugins={[Fullscreen, Slideshow, Thumbnails, Zoom]}
          />
        </>:null
      }
    </div>
  );
}

export default React.memo(Banners);
