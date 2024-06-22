import React, { useContext, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { TbWorld } from "react-icons/tb";
import { IoMenu } from "react-icons/io5";
import { Link } from "react-router-dom";
import { UserContext } from "../../UserContext";

const Header = () => {
  const [menu, setMenu] = useState(false);
  const menuHandler = () => {
    setMenu(!menu);
  };
  

  const { user } = useContext(UserContext);

  return (
    <>
      <div className="flex justify-around  2xl:px-80 md:px-20 px-6 py-6 border-b">
        <div className="flex gap-8">
          <div className="border rounded-full flex gap-4 py-1 shadow-sm items-center px-6">
            <div className="border-r pr-4 font-semibold">Any where</div>
            <div className="border-r pr-4 font-semibold">Any week</div>
            <div className="opacity-65">Add guest</div>
            <IoSearch className="bg-airbnb rounded-full text-white p-2 text-4xl" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
