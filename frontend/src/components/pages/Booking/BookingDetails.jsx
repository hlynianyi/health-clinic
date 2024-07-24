import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import "dayjs/locale/ru";
import { fetchDoctorById, bookAppointment } from "../../../store/doctorSlice";

const BookingDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [selectedDate, setSelectedDate] = useState(dayjs().startOf("day"));
  const [selectedTime, setSelectedTime] = useState(null);

  const doctor = useSelector((state) => state.doctors.selectedDoctor);
  const status = useSelector((state) => state.doctors.status);
  const error = useSelector((state) => state.doctors.error);

  useEffect(() => {
    if (id) {
      dispatch(fetchDoctorById(id));
    }
  }, [id, dispatch]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setSelectedTime(null); // Сбрасываем выбранное время при смене даты
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
    console.log("selected time log:", time);
    console.log("doctor log:", doctor);
  };

  //todo: fix db add
  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    if (!selectedTime) {
      alert("Please select a time.");
      return;
    }

    const appointmentData = {
      date: selectedDate.toISOString(), // Убедитесь, что дата в ISO формате
      time: selectedTime.format("HH:mm"), // Формат времени в строке
    };

    try {
      await dispatch(bookAppointment({ doctorId: id, ...appointmentData }));
      alert("Appointment booked successfully!");
    } catch (error) {
      console.error("Error booking appointment:", error);
    }
  };

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "failed") {
    return <p>Error: {error}</p>;
  }

  const startTime = dayjs().hour(8).minute(0); // Начало приема
  const endTime = dayjs().hour(17).minute(0); // Конец приема
  const timeSlots = [];
  let currentTime = startTime;

  while (currentTime.isBefore(endTime)) {
    timeSlots.push(currentTime);
    currentTime = currentTime.add(30, "minute");
  }

  return (
    <>
      {doctor ? (
        <>
          <h2 className="flex justify-center w-full mb-2 tablet:mb-4 py-2 pl-4 rounded-lg bg-bggray text-black font-montserrat text-xl">
            Запись на прием к {doctor.name}
          </h2>
          <section className="flex flex-col text-base">
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ru">
              <DatePicker
                value={selectedDate}
                onChange={handleDateChange}
                disablePast
              />
            </LocalizationProvider>
            <div className="grid grid-cols-3 gap-4 mt-4">
              {timeSlots.map((slot, index) => (
                <button
                  key={index}
                  onClick={() => handleTimeSelect(slot)}
                  className={`p-2 rounded-lg hover:bg-bggray  ${
                    selectedTime && selectedTime.isSame(slot)
                      ? "bg-maingreen text-white"
                      : "bg-bggray"
                  } ${
                    doctor.appointments?.some(
                      (appt) =>
                        dayjs(appt.date).isSame(selectedDate, "day") &&
                        dayjs(appt.time).isSame(slot, "minute")
                    )
                      ? "bg-red-500 text-white cursor-not-allowed"
                      : ""
                  }`}
                  disabled={doctor.appointments?.some(
                    (appt) =>
                      dayjs(appt.date).isSame(selectedDate, "day") &&
                      dayjs(appt.time).isSame(slot, "minute")
                  )}
                >
                  {slot.format("HH:mm")}
                </button>
              ))}
            </div>
            <button
              onClick={handleBookingSubmit}
              className="mt-4 bg-maingreen hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Записаться
            </button>
          </section>
        </>
      ) : (
        <p>Doctor not found</p>
      )}
    </>
  );
};

export default BookingDetails;
