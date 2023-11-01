import React, { useState, useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Menu, MenuItem } from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import {
  MenuOutlined,
  Login,
  Logout,
  Close,
  AccountCircleOutlined,
  MoreVertOutlined,
  PowerSettingsNew,
  AssignmentIndOutlined,
} from "@mui/icons-material";

import Image from "@components/Images";
import CustomButton from "@components/Button";
import { navList, navMobileList } from "@Data/navList";
import { logOutHandler } from "@Reducer/user/user-action";
import NavDesktopMenu from "./navDesktopMenu";

function MainHeader() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

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

    if (["LOGIN", "REGISTER"].includes(item.name) && user.isLogin) return;
    if (["My ZenSpace"].includes(item.name) && !user.isLogin) return;

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
        onClick={() => toggleMobileNav()}
      >
        {item.name}
      </NavLink>
    );
  });

  // switch mobile or desktop
  const [toggleNav, setToggleNav] = useState(false);
  const [toggleDeskMenu, setToggleDeskMenu] = useState(false);

  const toggleMobileNav = (e) => {
    setToggleNav(() => !toggleNav);
  };

  // log out
  const fetchLogout = useCallback(() => {
    setToggleNav(false);
    setToggleDeskMenu(false);
    dispatch(logOutHandler());
  }, []);

  const setToggleDeskMenuHandler = ()=>{
    setToggleDeskMenu(!toggleDeskMenu)
  }

  return (
    <nav className="nav">
      {/* desktop */}
      <div className="nav-desktop">
        <div className="nav-desktop-item-wrap">{renderDesktopNav}</div>
        {!user.isLogin ? (
          <Button
            variant="contained"
            onClick={() => navigate(`/login`)}
            size="large"
            startIcon={<Login />}
          >
            LOG IN
          </Button>
        ) : (
          <CustomButton
            onClick={setToggleDeskMenuHandler}
            // onClick={fetchLogout}
            className={`nav-desktop-profileBtnWrap`}
            disabled={false}
          >
            <AccountCircleOutlined
              sx={{ fontSize: "3rem" }}
              className={`nav-desktop-profileBtnWrap-icon`}
            />
            <MoreVertOutlined
              fontSize={`large`}
              className={`nav-desktop-profileBtnWrap-icon`}
            />
          </CustomButton>
        )}

        {toggleDeskMenu && <NavDesktopMenu fetchLogout={fetchLogout} toggleMenu={setToggleDeskMenuHandler} />}
      </div>

      {/* mobile */}
      <div className="nav-mobile">
        {renderMobileLogo}
        {/* menu btn */}
        <CustomButton
          className={`nav-mobile-menu-btn ${toggleNav?`nav-mobile-menu-btn-close`:null}`}
          onClick={toggleMobileNav}
          disabled={false}
        >
          {!toggleNav ? (
            <MenuOutlined sx={{ fontSize: 40 }} />
          ) : (
            <Close sx={{ fontSize: 40 }} />
          )}
        </CustomButton>

        {
          // toggle menu of nav
          toggleNav ? (
            <div
              className={`nav-mobile-menu ${
                toggleNav ? "nav-mobile-menu-visible" : ""
              }`}
            >

              {
                user.isLogin &&
                  <div className="nav-mobile-menu-profileBox">
                  <AccountCircleOutlined
                    sx={{ fontSize: "4rem" }}
                    className={`nav-mobile-menu-profileBox-icon`}
                  />
                  <div className="nav-mobile-menu-profileBox-profileNameWrap">
                    <p>{user.userInfo.firstname} {user.userInfo.lastname}</p>
                    <p>{user.userInfo.email}</p>
                  </div>
                </div>
              }

              <div className={`nav-mobile-menu-container `}>
                {renderMobileMenu}

                {user.isLogin && ( // log out
                  <div className="nav-mobile-menu-container-logoutBox">
                    <CustomButton 
                      onClick={fetchLogout}
                      className={`nav-mobile-menu-container-logoutBox-logoutBtn`}
                      disabled={false}
                    >
                      <PowerSettingsNew 
                      className={`nav-mobile-menu-container-logoutBox-logoutBtn-icon`} />
                      <span>LOG OUT</span>
                    </CustomButton>
                  </div>
                )}
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

export default React.memo(MainHeader);
