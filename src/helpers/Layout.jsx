import React from "react";
import Header from "../components/mainPage/Header";
import { Outlet } from "react-router";
import Footer from "../components/mainPage/Footer";
import { useMediaQuery } from "react-responsive";
import MobileBottomBar from "../components/mainPage/MobileBottomBar";

const Layout = () => {
  const isMobile = useMediaQuery({ maxWidth: 567 });

  return (
    <div className="font-figtree md:h-full h-screen relative ">
      <div className="z-10">
        <Header />
      </div>
      <div className="overflow-y-scroll relative ">
        <div className="px-12 py-6 2xl:px-80 ">
          <Outlet />
        </div>
        <div className="">
          <Footer />
        </div>
      </div>
      <div className="fixed bottom-0">
        {isMobile ? <MobileBottomBar /> : ""}{" "}
      </div>
    </div>
  );
};

export default Layout;
