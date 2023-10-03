import React from "react";
import Image from "../../Images";
import {  Link } from "react-router-dom";

import { navList } from "@Data/navList";
import {socialMedia} from '@Data/footer';

function Footer() {

  const renderDesktopNav = navList.map((item, index) => {
    if(index == 0) return
    return (
      <Link 
        to={item.path} 
        className={`footer-nav-item`} 
        key={index}>
        {item.name}
      </Link>
    );
  });

  const renderSocialMedia = socialMedia.map((item,index)=>(
    <Image
      key={index}
      src={item.default}
      alt={item.name}
      styles={item.class}
      img2={item.img2}
      img3={item.img3}
    />
  ))

  return (
    <footer className="footer">
      {/* icon */}
      <div className="footer-icon">
        <Image
          src={`logo/white/logo.png`}
          alt={`Logo`}
          styles={`footer-icon-logo`}
          img2={`logo/white/logo@2x.png`}
          img3={`logo/white/logo@3x.png`}
        />
      </div>
      {/* pages */}
      <div className="footer-nav">
        {renderDesktopNav}
      </div>
      {/* social media */}
      <div className="footer-SM">
        {renderSocialMedia}
      </div>
      {/* copy right */}
      <div className="footer-copyRightArea">
        Copyright &copy; 2023 ZENSPACE | All Rights Reserved 
      </div>
    </footer>
  );
}

export default Footer;
