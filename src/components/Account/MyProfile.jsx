import React, { useContext } from "react";
import { IoIosLogOut } from "react-icons/io";
import axios from "axios";
import { UserContext } from "../../UserContext";

const MyProfile = () => {
  const { user, setUser } = useContext(UserContext);

  const logoutHandler = async () => {
    try {
      await axios.post("/logout", {}, { withCredentials: true });
      setUser(null);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className=" md:h-screen ">
      <div className="flex gap-2  justify-center items-center">
        <div className="flex gap-2">
          Welcome <p className="font-semibold">{user.email}</p>
        </div>
        <button
          className="flex items-center  gap-2 py-2 px-2 bg-airbnb hover:bg-red-800 transition duration-100 ease-in rounded-full shadow-md text-white"
          onClick={logoutHandler}
        >
          <IoIosLogOut />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default MyProfile;
