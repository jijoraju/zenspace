import React, { useEffect } from "react";
import { NavLink, useNavigate, Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

// components
import Image from "@components/Images";

function Profile() {
  const user = useSelector((state) => state.user);
  const { userInfo } = user;
  const navigate = useNavigate();

  useEffect(() => {
    if (!user?.isLogin) {
      navigate(`/login`,{replace:true})
      return;
    }
  }, [user]);

  const map = [
    {
      path: "profileInfo",
      Name: "Profile Info",
      class: `profileNav-item`,
    },
    {
      path: "transaction",
      Name: "Transaction",
      class: `profileNav-item`,
    }
  ];
  return (
    <div className="profileContainer">
      <h1>My Zenspace</h1>

      <div className="profileContainer-Layout">
        <div className="profileSection profileNav">
          {map.map((item, index) => (
            <NavLink 
              key={index} 
              to={item?.path} 
              className={({ isActive, isPending }) =>
                isActive
                ? `${item.class} ${item.class}-active`
                : `${item.class}`
              }
              >
              {item?.Name}
            </NavLink>
          ))}
        </div>

        <div className="profileContainer-Layout-profileSection">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Profile;
