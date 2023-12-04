import React, { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

// components
import Image from "@components/Images";

function Profile() {
  const user = useSelector((state) => state.user);
  const {userInfo} = user
  const navigate = useNavigate();

  useEffect(() => {
    if (!user?.isLogin) {
      navigate(`/login`,{replace:true})
      return;
    }
  }, [user]);

  return (
      <div className="profileContainer-Layout-profileSection-information">
        {/* avatar */}
        <div className="profileContainer-Layout-profileSection-information-avatar">
          <Image
            src={`profile/avatar.png`}
            alt={`Avatar`}
            styles={`profileContainer-Layout-profileSection-information-avatar-img`}
            img2={`profile/avatar.png`}
            img3={`profile/avatar.png`}
          />
        </div>
        {/* info */}
        <div className="profileContainer-Layout-profileSection-information-info">
          <p>{`${userInfo?.firstname} ${userInfo?.lastname}`}</p>
          <p>{`${userInfo?.email}`}</p>
        </div>
      </div>
  );
}

export default Profile;
