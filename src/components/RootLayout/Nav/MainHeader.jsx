import React, { useState ,useCallback,useEffect} from "react";
import { useSelector, useDispatch} from "react-redux";
import { Button } from "@mui/material";
import { NavLink, useNavigate, } from "react-router-dom";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import CloseIcon from "@mui/icons-material/Close";

import Image from "@components/Images";
import { navList, navMobileList } from "@Data/navList";
import {logOutHandler} from '@Reducer/user/user-action'

function MainHeader() {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const user = useSelector((state)=>state.user)

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
      <NavLink
        to={item.path}
        className={({ isActive, isPending }) =>
          isPending
            ? "pending"
            : isActive
            ? `${item.class} ${item.class}-active`
            : `${item.class}`
        }
        key={index}
      >
        {item.name}
      </NavLink>
    );
  });

  // mobile logo
  const renderMobileLogo = navMobileList.map((item, index) => {
    if (index != 0) return;
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
    );
  });

  // mobile menu
  const renderMobileMenu = navMobileList.map((item, index) => {
    if (index == 0) return;

    if(['LOGIN','REGISTER'].includes(item.name) && user.isLogin) return

    return (
      <NavLink
        to={item.path}
        className={({ isActive, isPending }) =>
          isPending
            ? "pending"
            : isActive
            ? `${item.class} ${item.class}-active`
            : `${item.class}`
        }
        key={index}
        onClick={()=>toggleMobileNav()}
      >
        {item.name}
      </NavLink>
    );
  });

  // switch mobile or desktop
  const [toggleNav, setToggleNav] = useState(false);

  const toggleMobileNav = (e) => {
    setToggleNav(() => !toggleNav);
  };

  // log out
  const fetchLogout = useCallback(()=>{
    setToggleNav(false)
    dispatch(logOutHandler())
  },[])

  return (
    <nav className="nav">
      {/* desktop */}
      <div className="nav-desktop">
        <div className="nav-desktop-item-wrap">{renderDesktopNav}</div>
        {
          !user.isLogin ?(
            <Button 
              variant="contained" 
              onClick={()=>navigate(`/login`)}
              size="large"
              startIcon={<LoginIcon />}
              >
              LOG IN
            </Button>
          ):(
            <Button 
              variant="contained" 
              onClick={fetchLogout}
              size="large"
              startIcon={<LogoutIcon />}
              >
              LOG OUT
            </Button>
          )
        }

      </div>
      
      {/* mobile */}
      <div className="nav-mobile">
        {renderMobileLogo}
        {/* menu btn */}
        <button className="nav-mobile-menu-btn" onClick={toggleMobileNav}>
          {!toggleNav ? (
            <MenuOutlinedIcon sx={{ fontSize: 40 }} />
          ) : (
            <CloseIcon sx={{ fontSize: 40 }} />
          )}
        </button>

        {
          // toggle menu of nav
          toggleNav ? (
            <div
              className={`nav-mobile-menu ${
                toggleNav ? "nav-mobile-menu-visible" : ""
              }`}
            >
              <div className={`nav-mobile-menu-container `}>
                {renderMobileMenu}

                {
                  user.isLogin && (
                    <Button 
                      variant="contained" 
                      onClick={fetchLogout}
                      size="large"
                      startIcon={<LogoutIcon />}
                      >
                      LOG OUT
                    </Button>
                  )
                }

              </div>

            </div>
          ) : (
            <></>
          )
        }
      </div>
    </nav>
  );
}

export default MainHeader;
