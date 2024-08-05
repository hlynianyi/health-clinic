import React, { useEffect, useState } from "react";
import axios from "axios";
import Modal from "../subcomponents/ImageModal";

const License = () => {
  const [licenses, setLicenses] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchLicenses = async () => {
      const response = await axios.get("http://localhost:5000/api/licenses");
      setLicenses(response.data);
    };

    fetchLicenses();
  }, []);

  const openModal = (imagePath) => {
    setSelectedImage(imagePath);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <>
      <h2 className="flex justify-center w-full my-2 tablet:mb-4 py-2 pl-4 rounded-lg bg-bggray text-black text-lg font-montserrat">
        ЛИЦЕНЗИИ
      </h2>
      <section className="grid grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-2 gap-4 p-2">
        {licenses.map((license) => (
          <div
            key={license._id}
            className="gap-4 cursor-pointer transition-transform duration-300 hover:scale-105"
            onClick={() => openModal(license.imagePath)}
          >
            <img
              src={`http://localhost:5000/${license.imagePath}`}
              alt={license.title}
              className="w-full h-auto rounded-lg max-w-[380px] mx-auto"
            />
          </div>
        ))}
      </section>

      {selectedImage && (
        <Modal onClose={closeModal}>
          <img
            src={`http://localhost:5000/${selectedImage}`}
            alt="License"
            className="w-full h-auto rounded-lg"
          />
        </Modal>
      )}
    </>
  );
};

export default License;
