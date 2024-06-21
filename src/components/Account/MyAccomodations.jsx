import React, { useState } from "react";
import { IoMdAdd } from "react-icons/io";
import PlaceFormPage from "../../pages/PlaceFormPage";
import Places from "./Places";

const MyBookings = () => {
  const [active, setActive] = useState(false);

  return (
    <div className="border-t-2 w-full xl:w-2/3">
      {!active ? (
        <div className="relative ">
          <button
            className="bg-airbnb px-6 py-2 font-semibold text-white rounded-md flex items-center gap-4 hover:bg-red-500 hover:scale-105 transition duration-100 ease-in absolute right-0 mt-3 z-10"
            onClick={() => setActive(true)}
          >
            <IoMdAdd />
            Add New Place
          </button>

          <div className="pt-4 flex  flex-col gap-6 ">
            <h1 className="text-xl font-bold opacity-75 flex items-center justify-center">
              List of All Added Places
            </h1>
            <div className="pt-6 flex flex-col items-center justify-center ">
              <Places />
            </div>
          </div>
        </div>
      ) : (
        <PlaceFormPage setActive={setActive} />
      )}
    </div>
  );
};

export default MyBookings;
