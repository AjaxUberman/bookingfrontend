import React from "react";
import Header from "../components/mainPage/Header";
import { Outlet } from "react-router";
import Footer from "../components/mainPage/Footer";

const Layout = () => {
  return (
    <div className="font-figtree">
      <div className="z-10">
        <Header />
      </div>
      <div className="px-12 py-6 2xl:px-80 ">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
