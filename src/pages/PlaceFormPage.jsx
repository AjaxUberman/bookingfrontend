import React, { useEffect, useState } from "react";
import Perks from "../components/Account/Perks";
import NewHomeImg from "../components/Account/NewHomeImg";
import axios from "axios";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";

const PlaceFormPage = ({ setActive }) => {
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [maxGuests, setMaxGuests] = useState("");
  const [price, setPrice] = useState("");
  const { id } = useParams();
  const [required, setRequired] = useState(false);
  const navigate = useNavigate();

  const backendUrl = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    if (!id) {
      return;
    }
    axios
      .get(`/places/${id}/edit`, { withCredentials: true })
      .then((res) => {
        const { data } = res;
        setName(data.name);
        setTitle(data.title);
        setAddedPhotos(data.photos);
        setAddress(data.address);
        setDescription(data.description);
        setPerks(data.perks);
        setExtraInfo(data.extraInfo);
        setCheckOut(data.checkOut);
        setCheckIn(data.checkIn);
        setMaxGuests(data.maxGuests);
        setPrice(data.price);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [id]);

  const addNewHome = async (e) => {
    e.preventDefault();
    const placeData = {
      name,
      title,
      addedPhotos,
      address,
      description,
      perks,
      extraInfo,
      checkOut,
      maxGuests,
      price,
    };

    if (
      !name ||
      !title ||
      addedPhotos.length === 0 ||
      !address ||
      !description ||
      perks.length === 0 ||
      !checkOut ||
      !maxGuests ||
      !price
    ) {
      setRequired(true);
      return;
    }

    if (id) {
      await axios.put(
        `/places`,
        {
          id,
          ...placeData,
        },
        { withCredentials: true }
      );
      alert("Successfully saved your home.");
    } else {
      await axios.post(
        `/places`,
        {
          ...placeData,
        },
        { withCredentials: true }
      );
      alert("Successfully added your home.");
    }
    setActive("false");

    navigate("/");
  };

  const deleteHandler = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        axios.delete(`/places/${id}`, { withCredentials: true });
        alert("Place Deleted.");
        navigate("/account/places");
      }
    } catch (error) {
      console.error("Error deleting place:", error);
    }
  };

  return (
    <div className="">
      <form className="" onSubmit={addNewHome}>
        <h2 className="text-xl font-bold pt-5 pb-1">Owner</h2>
        <input
          type="text"
          placeholder="Owners name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border rounded-md w-full py-2 pl-2 focus:outline-airbnb "
        />
        <h2 className="text-xl font-bold pt-5 pb-1">Title</h2>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="title,like:My lovely Apt."
          className="border rounded-md w-full py-2 pl-2 focus:outline-airbnb"
        />
        <h2 className="text-xl font-bold pt-5 pb-1">Adress</h2>
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Adress to this place"
          className="border rounded-md w-full py-2 pl-2 focus:outline-airbnb"
        />
        <h2 className="text-xl font-bold pt-5 pb-1">Photos</h2>
        <NewHomeImg addedPhotos={addedPhotos} setAddedPhotos={setAddedPhotos} />
        <h2 className="text-xl font-bold pt-5 pb-1">Description</h2>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border rounded-md w-full h-40 p-2 focus:outline-airbnb"
        />
        <h2 className="text-xl font-bold pt-5 pb-1">Perks</h2>
        <Perks setPerks={setPerks} perks={perks} />
        <h2 className="text-xl font-bold pt-5 pb-1 ">
          Check in&out times, max Guests.
        </h2>
        <div className="grid grid-cols-4 gap-4">
          <div>
            <h3 className="font-semibold pb-1">Check in</h3>
            <input
              type="number"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              placeholder="14.00"
              className="border rounded-md py-2 w-full pl-2 focus:outline-airbnb"
            />
          </div>
          <div>
            <h3 className="font-semibold pb-1">Check Out</h3>
            <input
              type="number"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              placeholder="12.00"
              className="border rounded-md py-2 w-full pl-2 focus:outline-airbnb"
            />
          </div>
          <div>
            <h3 className="font-semibold pb-1">Max Guests</h3>
            <input
              type="number"
              value={maxGuests}
              onChange={(e) => setMaxGuests(e.target.value)}
              placeholder="6"
              className="border rounded-md py-2 w-full pl-2 focus:outline-airbnb"
            />
          </div>
          <div>
            <h3 className="font-semibold pb-1">Daily Price</h3>
            <input
              type="string"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="40$"
              className="border rounded-md py-2 w-full pl-2 focus:outline-airbnb"
            />
          </div>
        </div>
        <h2 className="text-xl font-bold pt-5 pb-1 ">House rules etc.</h2>
        <textarea
          value={extraInfo}
          onChange={(e) => setExtraInfo(e.target.value)}
          className="border rounded-md w-full h-20 p-2 focus:outline-airbnb"
        />
        <div className="grid grid-cols-4 py-4">
          <button className="bg-airbnb text-white font-bold w-full rounded-xl py-4 hover:scale-105 transition duration-100 ease-in hover:bg-red-500 col-span-3">
            Save
          </button>
          <button
            className="bg-gray-300  text-white font-bold w-full rounded-xl py-4 hover:scale-105 transition duration-100 ease-in hover:bg-gray-500"
            onClick={deleteHandler}
          >
            Delete
          </button>
        </div>
        {required && (
          <h1 className="font-semibold text-red-400 my-4 text-l tracking-wider">
            All Datas Must Required.
          </h1>
        )}
      </form>
    </div>
  );
};

export default PlaceFormPage;
