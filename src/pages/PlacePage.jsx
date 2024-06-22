import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import axios from "axios";
import { FaCreativeCommonsShare } from "react-icons/fa6";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Link, useLocation } from "react-router-dom";
import { CiEdit } from "react-icons/ci";
import { differenceInCalendarDays } from "date-fns";
import { useNavigate } from "react-router-dom";
import { IoIosPhotos } from "react-icons/io";
import { FaWindowClose } from "react-icons/fa";

const PlacePage = () => {
  const [placeDatas, setPlaceDatas] = useState([]);
  const { id } = useParams();
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [guest, setGuest] = useState(0);
  const location = useLocation();
  const [currentPath, setCurrentPath] = useState(location.pathname);
  const [placeOwner, setPlaceOwner] = useState("");
  const [totalPrice, setTotalPrice] = useState("");
  const [bookingError, setBookingError] = useState(false);
  const [photoActive, setPhotoActive] = useState(false);

  const navigate = useNavigate();
  const days = differenceInCalendarDays(endDate, startDate);

  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get(`/places/` + id, { withCredentials: true }).then((res) => {
      const { data } = res;
      setPlaceDatas(data);
    });
  }, [id]);

  useEffect(() => {
    if (!placeDatas || !placeDatas.owner) {
      return;
    }
    axios
      .get(`/users/` + placeDatas.owner, { withCredentials: true })
      .then((res) => {
        const { data } = res;
        setPlaceOwner(data);
      });
  }, [placeDatas]);

  const copyToClipboard = () => {
    const currentURL = window.location.href;
    navigator.clipboard
      .writeText(currentURL)
      .then(() => {
        alert("URL copied to clipboard!");
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };

  useEffect(() => {
    const finalPrice =
      parseFloat(placeDatas.price && placeDatas.price.replace("$", "")) *
      differenceInCalendarDays(endDate, startDate);
    setTotalPrice(finalPrice);
  }, [guest]);

  const makeBooking = async (e) => {
    e.preventDefault();
    if (placeOwner === false) {
      alert("Need to Login before booking");
      navigate("/login");
    }
    if (days > 0 && guest > 0) {
      setBookingError(false);
      try {
        const bookingData = {
          startDate,
          endDate,
          totalPrice,
          guest,
          place: placeDatas._id,
        };
        await axios.post(`/booking`, bookingData, {
          withCredentials: true,
        });
      } catch (error) {
        console.log(error);
      }

      navigate("/account/bookings");
    } else {
      setBookingError(true);
    }
  };

  if (!placeDatas) {
    return <div>Loading...</div>;
  }

  return (
    <div
      className={`flex flex-col gap-4 px-20 md:px-4 ${
        photoActive ? "bg-black bg-opacity-70 fixed inset-0 z-50" : ""
      }`}
    >
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">{placeDatas.title}</h1>
        <div className="flex gap-4">
          {placeOwner && (
            <Link
              to={`${currentPath}/edit`}
              className="flex gap-2 items-center bg-airbnb text-white rounded-xl px-3 py-1 font-semibold hover:scale-105 transition duration-100 ease-in"
            >
              <CiEdit />
              Edit
            </Link>
          )}

          {!photoActive && (
            <button
              className="flex gap-2 items-center bg-gray-200 rounded-xl px-3 py-1 font-semibold hover:scale-105 transition duration-100 ease-in"
              onClick={copyToClipboard}
            >
              <FaCreativeCommonsShare />
              Share
            </button>
          )}
        </div>
      </div>
      {placeDatas.photos && placeDatas.photos.length > 0 && (
        <div className="grid grid-cols-2 gap-2 relative">
          <img
            src={`https://bookingfullstack.com.tr/uploads/${placeDatas.photos[0]}`}
            className="rounded-xl shadow-md h-80 2xl:h-[450px] w-full object-cover"
          />
          <div
            className={`grid gap-2 ${
              placeDatas.photos.length < 4 ? "grid-cols-1" : "grid-cols-2"
            }`}
          >
            {placeDatas.photos.slice(1).map((photo, index) => (
              <div className="" key={index}>
                <img
                  src={`https://bookingfullstack.com.tr/uploads/${photo}`}
                  className="rounded-xl shadow-md h-40 w-full object-cover"
                />
              </div>
            ))}
          </div>
          <button
            className="flex bg-gray-100 rounded-xl absolute right-2 bottom-2 items-center py-1 px-4 gap-2"
            onClick={() => setPhotoActive(true)}
          >
            <IoIosPhotos />
            <h1>Show All Photos</h1>
          </button>
          {photoActive && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 h-screen z-10 ">
              <div className="flex flex-col items-center gap-4 border px-10  bg-white w-full h-full py-20  scrollbar scrollbar-thumb-airbnb scrollbar-track-gray-300  overflow-y-scroll rounded-xl fixed top-0">
                <button
                  onClick={() => setPhotoActive(false)}
                  className="absolute top-4 right-6 m-4  text-airbnb hover:text-gray-800"
                >
                  <FaWindowClose className="text-2xl" />
                </button>
                {placeDatas.photos.map((photo, index) => (
                  <div key={index} className="mb-4">
                    <img
                      src={`https://bookingfullstack.com.tr/uploads/${photo}`}
                      className="max-w-full h-auto rounded-lg shadow-md"
                      alt={`Photo ${index + 1}`}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
      <div className="grid grid-cols-3 ">
        <div className="col-span-2">
          <div className="border-b flex flex-col gap-4 pr-4">
            <div className="">
              <h2 className="font-semibold text-xl pt-2 ">
                {placeDatas.description && placeDatas.description.length > 25
                  ? placeDatas.description.split(0, 25).concat("...")
                  : placeDatas.description}
              </h2>
              <div className="">
                <span>{placeDatas.maxGuests} Guests</span>
                <a> - </a>
                <span>{placeDatas.checkIn} Check In</span>
                <a> - </a>
                <span>{placeDatas.checkOut} Check Out</span>
              </div>
            </div>
            <h1 className="font-semibold mb-2">Owner : {placeDatas.name}</h1>
          </div>
          <div className="mt-2 flex flex-col border-b py-4">
            <h1 className="font-semibold text-xl">This Place Offering:</h1>
            <div className="flex flex-col gap-2 mt-2">
              {placeDatas.perks &&
                placeDatas.perks.map((perk, index) => (
                  <div key={index} className="capitalize ">
                    <h1>{perk}</h1>
                  </div>
                ))}
            </div>
          </div>
          <div className="py-4">
            <h1 className="font-semibold text-xl">Extra Info :</h1>
            <span className="mt-2">{placeDatas.extraInfo}</span>
          </div>
        </div>
        {/* Prices */}
        <div className="border  rounded-xl py-8 px-8">
          <div className="flex gap-2 items-baseline">
            <h1 className="font-semibold  text-xl">
              {placeDatas.price && placeDatas.price.indexOf("$") === -1
                ? placeDatas.price.concat("$")
                : placeDatas.price}
            </h1>
            <span>per Night</span>
          </div>
          <div className="grid grid-cols-2 border border-black rounded-xl  mt-4 ">
            <div className="border-b border-r p-2 pl-4 overflow-hidden">
              <h1>Entrance</h1>
              <DatePicker
                className="cursor-pointer rounded-xl py-1  font-semibold focus:outline-none w-36"
                selected={startDate}
                onChange={(date) => setStartDate(date)}
              />
            </div>
            <div className="border-b p-2 overflow-hidden">
              <h1>Exit</h1>
              <DatePicker
                className="cursor-pointer rounded-xl py-1 font-semibold focus:outline-none w-36"
                selected={endDate}
                onChange={(date) => setEndDate(date)}
              />
            </div>
            <div className="pl-4 py-2">
              <h1>Guests</h1>
              <select
                id="maxGuests"
                value={guest}
                onChange={(e) => setGuest(e.target.value)}
                className="custom-select cursor-pointer w-40  rounded-xl  py-1  transition duration-100 ease-in"
              >
                {[...Array(placeDatas.maxGuests).keys()].map((num) => (
                  <option key={num + 1} value={num + 1}>
                    {num + 1}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {endDate > startDate && (
            <div className="my-2 flex gap-4 justify-between items-baseline">
              <span>{differenceInCalendarDays(endDate, startDate)} Days</span>
              <h1 className="font-semibold">
                Total :
                <span className="text-xl pl-2">
                  {parseFloat(
                    placeDatas.price && placeDatas.price.replace("$", "")
                  ) * differenceInCalendarDays(endDate, startDate)}
                  $
                </span>
              </h1>
            </div>
          )}
          <button
            className="bg-airbnb text-white font-semibold w-full py-2 mt-4 rounded-xl"
            onClick={makeBooking}
          >
            Make Booking
          </button>
          {bookingError === true ? (
            <div className="text-red-500 pt-4">
              <h1>Check Your Booking Choices</h1>
            </div>
          ) : (
            ""
          )}
          {bookingError === true ? (
            <div className="text-red-500 pt-4">
              <h1>Check Your Booking Choices</h1>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default PlacePage;
