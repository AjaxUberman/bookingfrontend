import React, { useContext, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { TbWorld } from "react-icons/tb";
import { IoMenu } from "react-icons/io5";
import { Link } from "react-router-dom";
import { UserContext } from "../../UserContext";
import { useMediaQuery } from "react-responsive";
import MobileHeader from "./MobileHeader";

const Header = () => {
  const [menu, setMenu] = useState(false);
  const menuHandler = () => {
    setMenu(!menu);
  };
  const isMobile = useMediaQuery({ maxWidth: 667 });

  const { user } = useContext(UserContext);

  return (
    <>
      {isMobile ? (
        <MobileHeader />
      ) : (
        <div className="flex justify-around py-4 2xl:px-80 md:px-20 border-b">
          <Link to="/" className="flex items-center gap-8">
            <img
              alt="airbnblogo"
              src="https://cdn.icon-icons.com/icons2/836/PNG/512/Airbnb_icon-icons.com_66791.png"
              className="w-10 h-10"
            />
          </Link>

          <div className="flex gap-8">
            <div className="border rounded-full flex gap-4 py-1 shadow-sm items-center px-6">
              <div className="border-r pr-4 font-semibold">Any where</div>
              <div className="border-r pr-4 font-semibold">Any week</div>
              <div className="opacity-65">Add guest</div>
              <IoSearch className="bg-airbnb rounded-full text-white p-2 text-4xl" />
            </div>
            <div className="flex items-center gap-4">
              <span className="font-bold hover:bg-gray-100 rounded-full px-4 py-2">
                Airbnb your home
              </span>
              <div className="hover:bg-gray-100 px-2 py-2 rounded-full">
                <TbWorld className=" rounded-full text-md " />
              </div>
            </div>
            <div className="flex flex-col gap-2 items-center justify-center">
              <button
                className="flex justify-center items-center border rounded-full shadow-md px-4 py-2 hover:scale-105 transition duration-100 ease-in relative"
                onClick={menuHandler}
              >
                <div className="flex items-center gap-4">
                  <IoMenu />
                  <img
                    src="https://static-00.iconduck.com/assets.00/profile-default-icon-512x511-v4sw4m29.png"
                    alt="pp"
                    className="w-8 h-8 opacity-60"
                  />
                  {user !== null ? (
                    <div>{user.email.slice(0, user.email.indexOf("@"))}</div>
                  ) : (
                    ""
                  )}
                </div>
              </button>
              {menu === true ? (
                user !== null ? (
                  <div className="flex flex-col gap-2 absolute top-20 border shadow-md rounded-md w-60 text-left z-10 ">
                    <Link
                      to={`/account`}
                      className="hover:bg-gray-100 pl-6 font-semibold py-2"
                      onClick={() => setMenu(false)}
                    >
                      Your Profile
                    </Link>
                  </div>
                ) : (
                  <div className="flex flex-col gap-2 absolute top-20 border shadow-md rounded-md w-60 text-left bg-white z-50 ">
                    <Link
                      to="/register"
                      className="hover:bg-gray-100 pl-6 font-semibold  py-2"
                      onClick={() => setMenu(false)}
                    >
                      Register
                    </Link>
                    <Link
                      to="/login"
                      className="hover:bg-gray-100 pl-6 py-2"
                      onClick={() => setMenu(false)}
                    >
                      Login
                    </Link>
                  </div>
                )
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
