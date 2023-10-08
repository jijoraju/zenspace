import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";

import MainHeader from "./Nav/MainHeader";
import Contact from "./Contact";
import Footer from "./Footer";
import { getUserInfo, LoginHandler } from "@Reducer/user/user-action";

function RootLayout() {
  const dispatch = useDispatch();
  const location = useLocation();
  const invisibleContact = ["/contact", `/login`, `/register`].includes(
    location.pathname
  );

  useEffect(() => {
    const getUser = getUserInfo();
    if (getUser) {
      dispatch(LoginHandler({data:getUser?.userInfo}));
    }
  }, [getUserInfo,LoginHandler]);

  return (
    <>
      <MainHeader />
      <Outlet />
      {!invisibleContact ? <Contact /> : ""}
      <Footer />
    </>
  );
}

export default RootLayout;
