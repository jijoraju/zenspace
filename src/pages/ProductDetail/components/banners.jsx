import React, { useState } from "react";

// MUI
import Modal from '@mui/material/Modal';
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";

// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";



// import PhotoAlbum from "react-photo-album";
// import Lightbox from "yet-another-react-lightbox";

// components
import Image from "@components/Images";

function Banners(props) {
  // const [swiperRef, setSwiperRef] = useState(null);
  // const [sliderView, setSliderView] = useState(3);
  const [open, setOpen] = React.useState(false);

  // const [photoIndex,setPhotoIndex] = useState(0);

  const { bannerData } = props;

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // const renderImgs = bannerData?.map((item, index) => (
  //   // <SwiperSlide key={index}>
  //     <Image
  //       key={index}
  //       src={item}
  //       alt={`detail img ${index + 1}`}
  //       styles={`detail-img`}
  //       img2={item}
  //       img3={item}
  //     />
  //   // </SwiperSlide>
  // ));

  return (
    <div className="bannerContainer">
      {/* <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      > */}
        {/* <Swiper
          onSwiper={setSwiperRef}
          spaceBetween={30}
          slidesPerView={sliderView}
          navigation={true}
          // loop={true}
          // pagination={{
          //   type: 'fraction',
          // }}
          pagination={true} 
          modules={[Pagination, Navigation]}
          freeMode={true} // 启用Manipulation效果
          // freeModeSticky={true} // 使轮播项粘附在滑动结束的位置
          centeredSlides={true}
          className="productDetailCarousel"
        >
          {renderImgs}
        </Swiper> */}
      {/* </Modal> */}

      {/* {renderImgs} */}
      <ImageList sx={{ width: "100%", height: 450 }} cols={3} rowHeight={164}>
        {bannerData.map((item, index) => (
          <div
            onClick={handleOpen}
            className="bannerContainer-imgBtn"
            key={index}
          >
            <ImageListItem>
              <img srcSet={item} src={item} alt={index + 1} loading="lazy" />
            </ImageListItem>
          </div>
        ))}
      </ImageList>

      {/* <PhotoAlbum
        layout="rows"
        photos={bannerData}
        targetRowHeight={150}
        onClick={({ index: current }) => setIndex(current)}
      /> */}
    </div>
  );
}

export default React.memo(Banners);
