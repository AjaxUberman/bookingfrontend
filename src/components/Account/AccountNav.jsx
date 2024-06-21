import React, { useState } from "react";
import { Link } from "react-router-dom";

const AccountNav = ({ active, setActive }) => {
  return (
    <div>
      <nav className="w-full flex flex-col gap-6 justify-center items-center">
        <div className="flex gap-4">
          <Link
            to={"/account"}
            onClick={(e) => setActive("profile")}
            className={`${
              active === "profile" ? "bg-airbnb text-white" : "border"
            } rounded-full px-4 py-2 font-semibold tracking-wide shadow-md hover:bg-airbnb hover:bg-opacity-70 transition duration-100 ease-in`}
          >
            My Profile
          </Link>
          <Link
            to={"/account/bookings"}
            onClick={() => setActive("bookings")}
            className={`${
              active === "bookings" ? "bg-airbnb text-white" : "border"
            } rounded-full px-4 py-2  font-semibold tracking-wide shadow-md hover:bg-airbnb hover:bg-opacity-70 transition duration-100 ease-in`}
          >
            My Bookings
          </Link>
          <Link
            to={"/account/places"}
            onClick={() => setActive("places")}
            className={`${
              active === "places" ? "bg-airbnb text-white" : "border"
            } rounded-full px-4 py-2 font-semibold tracking-wide shadow-md hover:bg-airbnb hover:bg-opacity-70 transition duration-100 ease-in`}
          >
            My Accomodations
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default AccountNav;
