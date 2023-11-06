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
      navigate(`/login`);
      return;
    }
  }, []);

  return (
    <div className="profileContainer">
      <h1>My Zenspace</h1>
      {/* user information  */}
      <div className="profileContainer-information">
        {/* avatar */}
        <div className="profileContainer-information-avatar">
          <Image
            src={`profile/avatar.png`}
            alt={`Avatar`}
            styles={`profileContainer-information-avatar-img`}
            img2={`profile/avatar.png`}
            img3={`profile/avatar.png`}
          />
        </div>
        {/* info */}
        <div className="profileContainer-information-info">
          <p>{`${userInfo?.firstname} ${userInfo?.lastname}`}</p>
          <p>{`${userInfo?.email}`}</p>
        </div>
      </div>
    </div>
  );
}

export default Profile;
