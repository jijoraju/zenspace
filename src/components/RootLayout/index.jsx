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
  const invisibleContact = ["/contact", `/login`, `/register`,`/profile`,'/payment','/checkout','/profile/transaction'].includes(
    location.pathname
  );

  // GA
  useEffect(()=>{
    const { pathname } = location
    const page = pathname.split('/')
    // console.log('page',page.join('/'))
    window.GaTracePageHandler(pathname,page.join('/'))
  },[])

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

export default React.memo(RootLayout);
