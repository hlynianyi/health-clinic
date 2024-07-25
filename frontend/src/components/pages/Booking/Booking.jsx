import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchDoctors } from "../../../store/doctorSlice";

const Booking = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const doctors = useSelector((state) => state.doctors.doctors);
  const status = useSelector((state) => state.doctors.status);
  const error = useSelector((state) => state.doctors.error);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchDoctors());
    }
  }, [status, dispatch]);

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "failed") {
    return <p>Error: {error}</p>;
  }

  return (
    <>
      <h2 className="flex justify-center  my-2 py-2 pl-2 border-[1px] border-bggray rounded-lg bg-bggray text-black font-montserrat text-lg">
        ВЫБЕРИТЕ ВРАЧА ДЛЯ ЗАПИСИ
      </h2>
      <section className="mb-4 grid grid-cols-1 tablet:grid-cols-2 desktop:grid-cols-3 laptop:grid-cols-3 gap-4 place-content-between">
        {doctors.map((doctor) => (
          <div
            className="flex flex-row gap-4 mb-1 p-2 border-bggray border-[2px] rounded-lg hover:bg-bggray  ease-in-out hover:scale-95 laptop:hover:scale-105 "
            key={doctor._id}
            onClick={() => navigate(`/booking/${doctor._id}`)}
          >
            <div className="w-1/2">
              <img
                className="rounded-lg object-cover h-full"
                src={`http://localhost:5000/${doctor.photo}`}
                alt={doctor.name}
                variant="rounded"
              />
            </div>
            <div className="w-1/2 flex flex-col ">
              <p className="font-medium mb-3">{doctor.name}</p>
              <p className="font-semibold text-base ">
                {doctor.specialty.toLowerCase()}
              </p>
            </div>
          </div>
        ))}
      </section>
    </>
  );
};

export default Booking;
