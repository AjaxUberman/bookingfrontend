import React, { useState } from "react";
import { MdCloudUpload } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import axios from "axios";

const NewHomeImg = ({ addedPhotos, setAddedPhotos }) => {
  const [photoLink, setPhotoLink] = useState("");

  const addPhotoWithLink = async (e) => {
    e.preventDefault();
    if (photoLink) {
      const { data: filename } = await axios.post("/upload-by-link", {
        link: photoLink,
      });
      setAddedPhotos((prev) => {
        return [...prev, filename];
      });
    }
    setPhotoLink("");
  };

  const uploadImage = (e) => {
    const files = e.target.files;
    const data = new FormData();

    for (let i = 0; i < files.length; i++) {
      data.append("photos", files[i]);
    }
    axios
      .post("/upload", data, {
        headers: { "Content-type": "multipart/form-data" },
      })
      .then((response) => {
        const { data: filenames } = response;
        setAddedPhotos((prev) => {
          return [...prev, ...filenames];
        });
      });
  };

  const photoDeleter = (e, filename) => {
    e.preventDefault();
    const filteredPhotos = addedPhotos.filter((photo) => photo !== filename);
    setAddedPhotos(filteredPhotos);
  };

  return (
    <div>
      <div className="w-full grid grid-cols-2">
        <input
          placeholder="Add with Link"
          value={photoLink}
          onChange={(e) => setPhotoLink(e.target.value)}
          className="border rounded-md py-2 pl-2 focus:outline-airbnb"
        />
        <button
          className="bg-airbnb text-white py-1 px-4 rounded-xl"
          onClick={addPhotoWithLink}
        >
          Add Photo
        </button>
      </div>
      <h1 className="text-xl font-bold pt-5">Or Upload</h1>
      <div className="grid lg:grid-cols-6 grid-cols-3 pt-2 gap-2 w-full">
        <label className="border bg-transparent rounded-2xl px-6 py-3 text-xl flex items-center justify-center gap-2 cursor-pointer">
          <span className="font-semibold">Select</span>
          <div className="text-airbnb">
            <MdCloudUpload />
          </div>
          <input
            type="file"
            multiple
            className="hidden"
            onChange={uploadImage}
          />
        </label>
        {addedPhotos &&
          addedPhotos.map((photo, index) => (
            <div key={index} className="relative">
              <button
                className="absolute right-0 top-0 rounded-full bg-airbnb text-white text-xl"
                onClick={(e) => photoDeleter(e, photo)}
              >
                <IoMdClose />
              </button>
              <img
                alt={photo}
                src={"https://bookingfullstack.com.tr/uploads/" + photo}
                className="rounded-xl w-full h-20 object-cover shadow-md"
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default NewHomeImg;
