import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

// components
import Image from "@components/Images";
import SearchLocationInput from "./searchLocationInput";

// data
import { solutions } from "@Data/home";

export default React.memo(function Home() {
  
  // render solution cards
  const renderSolutionCards = solutions.map((item, index) => (
    <div className="solutionsCard-container-card" key={index}>
      <div className="solutionsCard-container-card-front">
        <Image
          src={item.default}
          alt={`solution-${index} Card`}
          styles={item.class}
          img2={item.img2}
          img3={item.img3}
        />
      </div>
      <div className="solutionsCard-container-card-back">
        <h2 className="card__price-only">{item.title}</h2>
        <p className="card__price-value">{item.content}</p>
      </div>
    </div>
  ));

  return (
    <div className="home_container">
      {/* header */}
      <div className="home-header">
      {/* search container */}
        <SearchLocationInput />
        <div className="home-header-banner">
          <Image
            src={`home/banner/homeBanner.png`}
            alt={`home`}
            styles={`home-header-banner-image`}
            img2={`home/banner/homeBanner@2x.png`}
            img3={`home/banner/homeBanner@3x.png`}
          />
        </div>
      </div>
      {/* solutions card */}
      <div className="solutions-container">
        <div className="solutions-container-description">
          <h1>Meet your workplace needs, we have the solution.</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipiscing elit volutpat
            gravida malesuada quam commodo id integer nam.
          </p>
        </div>
      </div>

      <div className="solutionsCard-container">{renderSolutionCards}</div>

      <div className="solutions-container know-wrap">
        <div className="solutions-container-description">
          <h1>Here's everything you need to know about work.</h1>
        </div>
      </div>

      {/* sign up btn */}
      <div className="createAccount-container">
        <div className="createAccount-container-itemBox">
          <h2>Create your account today and get started for free!</h2>
          <Link to="/register" className="createAccount-container-itemBox-Btn">
            Sign up
          </Link>
        </div>

        <div className="createAccount-container-itemBox">
          <Image
            src={`home/createAcc/createAcc.png`}
            alt={`Create an account Image`}
            styles={`createAccount-container-itemBox-img`}
            img2={`home/createAcc/createAcc@2x.png`}
            img3={`home/createAcc/createAcc@3x.png`}
          />
        </div>
      </div>
    </div>
  );
});
