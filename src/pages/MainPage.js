import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaChevronCircleRight } from "react-icons/fa";
import { FaChevronCircleLeft } from "react-icons/fa";
import { Link } from "react-router-dom";

const MainPage = () => {
  const [placeDatas, setPlaceDatas] = useState([]);
  const [selectedValues, setSelectedValues] = useState([]);
  const [selectedPhoto, setSelectedPhoto] = useState(0);
  const [selectedPlace, setSelectedPlace] = useState(0);

  useEffect(() => {
    axios
      .get(`/main`, { withCredentials: true })
      .then((res) => setPlaceDatas(res.data));
  }, []);

  useEffect(() => {
    if (placeDatas && placeDatas.length > 0) {
      setSelectedValues(Array(placeDatas.length).fill(0));
    }
  }, [placeDatas]);

  const clickHandler = (e, value, ind) => {
    e.preventDefault();
    setSelectedPlace(ind);
    setSelectedValues((prevSelectedValues) => {
      const newSelectedValues = [...prevSelectedValues];
      newSelectedValues[ind] += value;
      return newSelectedValues;
    });
    setSelectedPhoto(placeDatas[ind].photos[selectedValues[ind]]);
  };

  return (
    <div className="flex items-center justify-center">
      <div className="grid grid-cols-3 gap-5">
        {placeDatas &&
          placeDatas.map((place, index) => (
            <div key={index} className="">
              <Link
                to={"/account/places/" + place._id}
                className="cursor-pointer"
              >
                <div className="relative flex justify-center items-center">
                  <button
                    value={index}
                    onClick={(e) => clickHandler(e, -1, index)}
                    disabled={selectedValues[index] === 0}
                    className=""
                  >
                    <FaChevronCircleLeft
                      className={`text-white text-2xl absolute left-2 shadow-md hover:scale-105 transition duration-100 ease-in ${
                        selectedValues[index] === 0 ? "hidden" : ""
                      }`}
                    />
                  </button>
                  <img
                    alt={place.photos[selectedPhoto]}
                    src={`http://localhost:4000/uploads/${
                      selectedPlace === index
                        ? place.photos[selectedValues[index]]
                        : place.photos[0]
                    }`}
                    className="rounded-xl w-60 h-60 object-cover shadow-md"
                  />

                  <button
                    value={index}
                    onClick={(e) => clickHandler(e, +1, index)}
                    disabled={selectedValues >= place.photos.length - 1}
                  >
                    <FaChevronCircleRight
                      className={`text-white text-2xl absolute right-2 shadow-md hover:scale-105 transition duration-100 ease-in ${
                        selectedValues[index] >= place.photos.length - 1
                          ? "hidden"
                          : ""
                      }`}
                    />
                  </button>
                </div>
                <h1 className="font-bold">{place.title}</h1>
                <h2 className="opacity-70">
                  {place.description.length > 20
                    ? place.description.slice(0, 20).concat("...")
                    : place.description}
                </h2>
                <h2 className="opacity-75 font-semibold">
                  {place.maxGuests} Guests
                </h2>
                <h2 className="font-semibold underline">
                  {place.price.indexOf("$") !== -1
                    ? place.price
                    : place.price.concat("$")}
                </h2>
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
};

export default MainPage;
