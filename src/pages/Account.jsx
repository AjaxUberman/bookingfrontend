import React, { useContext, useState } from "react";
import { UserContext } from "../UserContext";
import { Navigate, useLocation } from "react-router";
import MyProfile from "../components/Account/MyProfile";
import MyBookings from "../components/Account/MyBookings";
import MyAccomodations from "../components/Account/MyAccomodations";
import AccountNav from "../components/Account/AccountNav";

const Account = () => {
  const { user, ready } = useContext(UserContext);
  const [active, setActive] = useState("profile");
  const { pathname } = useLocation();
  console.log(pathname);
  if (!ready) {
    return "Loading...";
  }

  if (ready && !user) {
    return <Navigate to={"/login"} />;
  }

  return (
    <div className="">
      <div className="w-full flex flex-col gap-6 justify-center items-center">
        <AccountNav setActive={setActive} active={active} pathname={pathname} />
        {pathname === "/account" && <MyProfile />}
        {pathname === "/account/bookings" && <MyBookings />}
        {pathname === "/account/places" && <MyAccomodations />}
      </div>
    </div>
  );
};

export default Account;
