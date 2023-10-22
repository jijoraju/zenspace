import React, { useRef, useState, useEffect } from "react";
import { SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";

// components
import Image from "@components/Images";
import Carousel from "@components/Carousel";
import CustomButton from "@components/Button";
import Cards from './cards'

// data
import { carouselData, cooperationData } from "@Data/solutions";

function Solution() {

  // render sliders
  const renderSliders = carouselData.map((item, index) => (
      <SwiperSlide key={index}>
        <Image
          src={item.imgDefault}
          alt={item.style}
          styles={item.style}
          img2={item.img2}
          img3={item.img3}
        />
      </SwiperSlide>
    ));

  // render Cooperations
  const renderCooperations = cooperationData.map((item, index) => (
            <Image
              key={index}
              src={item.imgDefault}
              alt={item.style}
              styles={item.style}
              img2={item.img2}
              img3={item.img3}
            />
          ))

  return (
    <>
      {/* Carousel */}
      <div className="solution-banner" style={{ maxWidth: window.screen }}>
        <Carousel data={carouselData}>{renderSliders}</Carousel>

        <div className="solution-banner-slug">
          <h1>Meet our work space</h1>
          <p>
            We provide various office spaces to meet your and your team's needs
            and help you solve space problems!
          </p>
        </div>
      </div>

      {/* cooperation */}
      <div className="solution-cooperation">
        <div className="solution-cooperation-leftSide solution-cooperation-ItemWrap">
          <h2>Trusted by 10,000+ companies around the world</h2>
        </div>

        <div className="solution-cooperation-rightSide solution-cooperation-ItemWrap">
          {renderCooperations}
        </div>
      </div>

      {/* feedbacks */}
      <div className="solution-feedbacks">
        {/* description */}
        <div className="solution-feedbacks-descriptionWrap">
          <div className="solution-feedbacks-descriptionWrap-block">
            <h1>What our clients say</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipiscing elit semper
              dalar elementum tempus hac tellus libero
            </p>
          </div>
          {/*  */}
          <div className="solution-feedbacks-descriptionWrap-block">
            <Link to="/product" className="linkItem">
              Search Now {`\>`}
            </Link>

            <Link to="/contact" className="linkItem">
              Talk to us
            </Link>
          </div>
        </div>

        {/* cards */}
        <Cards />
      </div>
    </>
  );
}

export default React.memo(Solution);
