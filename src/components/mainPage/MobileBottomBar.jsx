import React, { useContext } from "react";
import { CiSearch } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";
import { Link } from "react-router-dom";
import { UserContext } from "../../UserContext";

const MobileBottomBar = () => {
  const { user } = useContext(UserContext);

  return (
    <div className="w-screen h-full bg-white border-t flex justify-around py-5">
      <Link to={"/"} className="flex flex-col items-center">
        <CiSearch />
        <h1>Explore</h1>
      </Link>
      <Link
        to={user ? "/account" : "/login"}
        className="flex flex-col items-center"
      >
        <CgProfile />
        <h1>Profile</h1>
      </Link>
    </div>
  );
};

export default MobileBottomBar;
