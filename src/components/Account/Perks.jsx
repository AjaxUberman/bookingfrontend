import React from "react";
import { FaWifi } from "react-icons/fa";
import { MdOutlinePets } from "react-icons/md";
import { FaCar } from "react-icons/fa";
import { PiTelevisionSimpleFill } from "react-icons/pi";
import { FaDoorClosed } from "react-icons/fa6";

const Perks = ({ setPerks, perks }) => {
  const handleClick = (name) => {
    if (perks.includes(name)) {
      const deletedPerks = perks.filter((perk) => perk !== name);
      setPerks(deletedPerks);
    } else {
      setPerks([...perks, name]);
    }
  };

  return (
    <div className="grid grid-cols-3 ">
      <label className="flex items-center gap-6 pl-10 border py-4 rounded-xl cursor-pointer">
        <input
          type="checkbox"
          checked={perks.includes("wifii")}
          onChange={() => handleClick("wifii")}
        />
        <div className="text-3xl">
          <FaWifi />
        </div>
        <span className="font-semibold">Wifii</span>
      </label>
      <label className="flex items-center gap-6 pl-10  border py-4 rounded-xl cursor-pointer">
        <input
          type="checkbox"
          checked={perks.includes("parking")}
          onChange={() => handleClick("parking")}
        />
        <div className="text-3xl">
          <FaCar />
        </div>
        <span className="font-semibold">Free Parking Spot</span>
      </label>
      <label className="flex items-center gap-6 pl-10  border py-4 rounded-xl cursor-pointer">
        <input
          type="checkbox"
          checked={perks.includes("tv")}
          onChange={() => handleClick("tv")}
        />
        <div className="text-3xl">
          <PiTelevisionSimpleFill />
        </div>
        <span className="font-semibold">TV</span>
      </label>
      <label className="flex items-center gap-6 pl-10  border py-4 rounded-xl cursor-pointer">
        <input
          type="checkbox"
          checked={perks.includes("pets")}
          onChange={() => handleClick("pets")}
        />
        <div className="text-3xl">
          <MdOutlinePets />
        </div>
        <span className="font-semibold">Pets</span>
      </label>
      <label className="flex items-center gap-6 pl-10  border py-4 rounded-xl cursor-pointer">
        <input
          type="checkbox"
          checked={perks.includes("entrance")}
          onChange={() => handleClick("entrance")}
        />
        <div className="text-3xl">
          <FaDoorClosed />
        </div>
        <span className="font-semibold">Private Entrance</span>
      </label>
    </div>
  );
};

export default Perks;
