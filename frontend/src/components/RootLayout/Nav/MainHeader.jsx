import React, {useState} from 'react'
import { Button } from "@mui/material";
import { NavLink, useNavigate} from "react-router-dom";
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import CloseIcon from '@mui/icons-material/Close';

import Image from "@components/Images";
import { navList ,navMobileList} from "@Data/navList";

function MainHeader() {
  // desktop nav
  const renderDesktopNav = navList.map((item, index) => {
    return item.name == "Logo" ? (
      <NavLink to={item.path} key={index}>
        <Image
          src={item.default}
          alt={item.name}
          styles={item.class}
          img2={item.img2}
          img3={item.img3}
        />
      </NavLink>
    ) : (
      <NavLink to={item.path} className={item.class} key={index}>
        {item.name}
      </NavLink>
    );
  });

  // mobile logo
  const renderMobileLogo = navMobileList.map((item,index)=>{
    if(index!=0) return
    return (
      <NavLink to={item.path} key={index}>
        <Image
          src={item.default}
          alt={item.name}
          styles={item.class}
          img2={item.img2}
          img3={item.img3}
        />
    </NavLink>
    )
  })

  // mobile menu
  const renderMobileMenu = navMobileList.map((item,index)=>{
    if(index==0) return

    // if(['LOGIN','REGISTER'].includes(item.name)) return
    // if(['LOGOUT'].includes(item.name)) return
    return (
      <p onClick={()=>goToPage(item.path)} className={item.class} key={index}>
        {item.name}
      </p>
    )
  })

  const [toggleNav, setToggleNav] = useState(false)

  const toggleMobileNav = (e)=>{
    setToggleNav(()=>!toggleNav)
  }

  const navigate = useNavigate()
  const goToPage = (path)=>{
    setToggleNav(()=>!toggleNav)
    navigate(`${path}`)
  }
  return (
    <nav className="nav">
      <div className="nav-desktop">
        <div className="nav-desktop-item-wrap">{renderDesktopNav}</div>
        <Button variant="contained">Log in</Button>
      </div>

      <div className="nav-mobile">
        { renderMobileLogo}
        {/* menu btn */}
        <button className='nav-mobile-menu-btn' onClick={toggleMobileNav}>
          {!toggleNav?<MenuOutlinedIcon sx={{ fontSize: 40 }}/>:<CloseIcon sx={{ fontSize: 40 }}/>}
        </button>

        { // toggle menu of nav
          toggleNav ?(
            <div className={`nav-mobile-menu ${toggleNav?'nav-mobile-menu-visible':''}`}>

            <div className={`nav-mobile-menu-container `}>
              {renderMobileMenu}
            </div>
          </div>
          ):<></>
        }

      </div>
    </nav>
  );
}

export default MainHeader;
