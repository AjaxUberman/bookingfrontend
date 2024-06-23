import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaChevronCircleRight } from "react-icons/fa";
import { FaChevronCircleLeft } from "react-icons/fa";
import { Link } from "react-router-dom";

const Places = () => {
  const [placeDatas, setPlaceDatas] = useState([]);
  const [selectedPhoto, setSelectedPhoto] = useState(0);

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const response = await axios.get("/places", { withCredentials: true });
        setPlaceDatas(response.data);
      } catch (error) {
        console.error("Error fetching places data:", error);
      }
    };

    fetchPlaces();
  }, []);

  const clickHandler = (e) => {
    setSelectedPhoto(selectedPhoto + Number(e.currentTarget.value));
  };

  return (
    <div className="grid md:grid-cols-3 grid-cols-1 gap-5">
      {placeDatas &&
        placeDatas.map((place, index) => (
          <div className="">
            <Link
              to={"/account/places/" + place._id}
              key={index}
              className="cursor-pointer"
            >
              <div className="relative flex justify-center items-center">
                <button
                  value={-1}
                  onClick={(e) => {
                    clickHandler(e);
                  }}
                  disabled={selectedPhoto === 0}
                  className=""
                >
                  <FaChevronCircleLeft
                    className={`text-white text-2xl absolute left-2 shadow-md hover:scale-105 transition duration-100 ease-in ${
                      selectedPhoto === 0 ? "hidden" : ""
                    }`}
                  />
                </button>
                <img
                  alt={place.photos[selectedPhoto]}
                  src={
                    `${process.env.REACT_APP_BACKEND_URL}/uploads/` +
                    place.photos[selectedPhoto]
                  }
                  className="rounded-xl w-44 h-44 object-cover shadow-md"
                />
                <button
                  value={+1}
                  onClick={(e) => {
                    clickHandler(e);
                  }}
                  disabled={selectedPhoto >= place.photos.length - 1}
                >
                  <FaChevronCircleRight
                    className={`text-white text-2xl absolute right-2 shadow-md hover:scale-105 transition duration-100 ease-in ${
                      selectedPhoto >= place.photos.length - 1 ? "hidden" : ""
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
  );
};

export default Places;
