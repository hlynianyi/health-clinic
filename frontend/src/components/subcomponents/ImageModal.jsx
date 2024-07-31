import React, { useEffect, useState } from "react";

const Modal = ({ onClose, children }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-50 transition-opacity duration-300 ${
        isVisible
          ? "opacity-100 bg-black bg-opacity-50"
          : "opacity-0 bg-transparent"
      }`}
    >
      <div
        className={`bg-white p-4 rounded-lg relative transition-transform transform duration-300 ease-in-out ${
          isVisible ? "scale-100" : "scale-75"
        }`}
      >
        <button
          onClick={handleClose}
          className="absolute top-0 right-0 m-2 text-black text-xl bg-graytext rounded py-1 px-3 text-white flex justify-center items-center"
        >
          Закрыть
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
