import React from "react";
import { useSelector,} from "react-redux";
import {AccountCircleOutlined,PowerSettingsNew, AssignmentIndOutlined} from "@mui/icons-material";

import CustomButton from "@components/Button";

function NavDesktopMenu(props) {
  const user = useSelector((state)=>state.user)
  const {fetchLogout} = props

  if(!user) return
  return (
    <div className="nav-desktop-menu">

      <div className="nav-desktop-menu-profileBox">
        <AccountCircleOutlined sx={{ fontSize: '3rem' }} className={`nav-desktop-menu-profileBox-icon`} />
        <div className="nav-desktop-menu-profileBox-profileNameWrap">
          <p>{user.userInfo.email}</p>
        </div>
      </div>

      {/* profile */}
      <CustomButton 
        onClick={()=>{}}
        styleName={`nav-desktop-menu-logoutBtn`}
        disabled={false}
      >
        <AssignmentIndOutlined sx={{ fontSize: '2rem' }} className={`nav-desktop-menu-logoutBtn-icon`} />
        <span>My Zenspace</span>
      </CustomButton>

      {/* log out */}
      <CustomButton 
        onClick={fetchLogout}
        styleName={`nav-desktop-menu-logoutBtn`}
        disabled={false}
      >
        <PowerSettingsNew 
        sx={{ fontSize: '2rem' }} className={`nav-desktop-menu-logoutBtn-icon`} />
        <span>LOG OUT</span>
      </CustomButton>
    </div>
  )
}

export default NavDesktopMenu
