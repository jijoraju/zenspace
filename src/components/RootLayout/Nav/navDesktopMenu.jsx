import React from "react";
import { useSelector,} from "react-redux";
import {AccountCircleOutlined,PowerSettingsNew, AssignmentIndOutlined, FavoriteBorderOutlined} from "@mui/icons-material";
import { NavLink, useNavigate, Link } from "react-router-dom";

// components
import CustomButton from "@components/Button";

function NavDesktopMenu(props) {
  const navigate = useNavigate()
  const user = useSelector((state)=>state.user)
  const {fetchLogout} = props

  if(!user) return

  const goToPage = (page)=>{
    navigate(`/${page}`)
  }

  return (
    <div className="nav-desktop-menu">

      <div className="nav-desktop-menu-profileBox">
        <AccountCircleOutlined sx={{ fontSize: '4rem' }} className={`nav-desktop-menu-profileBox-icon`} />
        <div className="nav-desktop-menu-profileBox-profileNameWrap">
          <p>{user.userInfo.firstname} {user.userInfo.lastname}</p>
          <p>{user.userInfo.email}</p>
        </div>
      </div>

      {/* profile */}
      <CustomButton 
        onClick={()=>{}}
        className={`nav-desktop-menu-logoutBtn`}
        disabled={false}
      >
        <AssignmentIndOutlined  className={`nav-desktop-menu-logoutBtn-icon`} />
        <span>My Zenspace</span>
      </CustomButton>

      {/* <CustomButton 
        onClick={()=>goToPage('favorite')}
        className={`nav-desktop-menu-logoutBtn`}
        disabled={false}
      >
        <FavoriteBorderOutlined className={`nav-desktop-menu-logoutBtn-icon`} />
        <span>Favorite</span>
      </CustomButton> */}

      {/* log out */}
      <CustomButton 
        onClick={fetchLogout}
        className={`nav-desktop-menu-logoutBtn`}
        disabled={false}
      >
        <PowerSettingsNew 
         className={`nav-desktop-menu-logoutBtn-icon`} />
        <span>LOG OUT</span>
      </CustomButton>
    </div>
  )
}

export default React.memo(NavDesktopMenu)
