import React from "react";
import { Outlet } from "react-router-dom";
import { useLocation } from 'react-router-dom';

import MainHeader from "./Nav/MainHeader";
import Contact from './Contact'
import Footer from "./Footer";

function RootLayout() {
  const location = useLocation();
  const invisibleContact = ['/contact'].includes(location.pathname)

  return (
    <>
      <MainHeader />
      <Outlet />
      {!invisibleContact ?<Contact /> :''}
      <Footer />
    </>
  );
}

export default RootLayout;
