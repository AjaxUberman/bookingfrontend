import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const MyBookings = () => {
  const [datas, setDatas] = useState([]);

  const backendUrl = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    axios
      .get(`/booking`, {
        withCredentials: true,
      })
      .then((res) => setDatas(res.data));
  }, []);

  const cancelBooking = (e, bookingId) => {
    e.preventDefault();
    axios.delete(`/booking/${bookingId}`, {
      withCredentials: true,
    });
    window.location.reload();
  };

  console.log(datas);

  return (
    <div className="flex flex-col md:h-screen  items-center ">
      {datas.length > 0 ? (
        <h1 className="font-bold text-xl border-b mb-5">Enjoy Your Trip!</h1>
      ) : (
        <Link to={"/"} className="font-bold text-xl border-b mb-5">
          You don't have any bookings. Make one now.
        </Link>
      )}
      <div className=" flex flex-col md:flex-row gap-5">
        {datas &&
          datas.map((places, index) => (
            <Link
              to={`/account/places/${places.place._id}`}
              className="border rounded-xl grid md:grid-cols-4 items-center  gap-4 p-6 shadow-md relative"
            >
              <div className="flex md:flex-col gap-2 items-center">
                <h1 className="font-semibold text-xl">{places.place.title}</h1>
                <img
                  src={`https://bookingfullstack.com.tr/uploads/${places.place.photos[0]}`}
                  className="w-40 h-40 rounded-xl"
                />
              </div>
              <div className="col col-span-3 md:pl-10 flex flex-col gap-4">
                <h2>
                  Your Trip To :
                  <span className="font-semibold ml-3">
                    {places.place.address}
                  </span>
                </h2>
                <div className="flex gap-4 items-center">
                  <h2>
                    Check in Date :
                    <span className="font-semibold ml-3">
                      {places.startDate.slice(0, places.startDate.indexOf("T"))}
                    </span>
                  </h2>
                  <h2>
                    Check out Date :
                    <span className="font-semibold ml-3">
                      {places.endDate.slice(0, places.endDate.indexOf("T"))}
                    </span>
                  </h2>
                </div>
                <h2>
                  Max Guests :
                  <span className="font-semibold ml-3">
                    {places.place.maxGuests}
                  </span>
                </h2>
              </div>
              <button
                className="bg-airbnb rounded-xl absolute right-1 px-4 py-1 text-white bottom-1 hover:bg-red-500 hover:scale-105 transition duration-100 ease-in"
                onClick={(e) => cancelBooking(e, places._id)}
              >
                Cancel
              </button>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default MyBookings;
