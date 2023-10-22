import React, { useRef, useState, useEffect ,useLayoutEffect} from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";


function Carousel(props) {
  const [swiperRef, setSwiperRef] = useState(null);
  const [sliderView,setSliderView]  = useState(3);

  useLayoutEffect(()=>{
    const reSize = ()=>{
      const num =  screen.width < 600 ? 1 : screen.width < 800 ? 2 :  3
      setSliderView(num)
    }

    reSize()
  },[screen.width])

  return (
    <Swiper
      onSwiper={setSwiperRef}
      spaceBetween={30}
      slidesPerView={sliderView}
      navigation={true}
      // loop={true}
      // pagination={{
      //   type: 'fraction',
      // }}
      modules={[Pagination, Navigation]}
      freeMode={true} // 启用Manipulation效果
      freeModeSticky={true} // 使轮播项粘附在滑动结束的位置
      // centeredSlides={true}
      className="carouselContainer"
    >
        {props.children}
    </Swiper>
  )
}

export default Carousel