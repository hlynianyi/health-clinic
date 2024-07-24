import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import dayjs from "dayjs";
import "dayjs/locale/ru";
import { fetchDoctorById, bookAppointment } from "../../../store/doctorSlice";

dayjs.extend(localizedFormat); // Подключаем плагин
dayjs.locale("ru");

const BookingDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [selectedDate, setSelectedDate] = useState(dayjs().startOf("day"));
  const [selectedTime, setSelectedTime] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

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
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    if (!selectedTime) {
      alert("Please select a time.");
      return;
    }

    const appointmentData = {
      date: selectedDate.toISOString(),
      time: selectedTime.format("HH:mm"),
      name, // Добавляем имя
      email, // Добавляем email
      phone, // Добавляем телефон
    };
    console.log("appointmentData :>> ", appointmentData);
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
          <h2 className="flex justify-center w-full my-2 tablet:mb-4 py-2 pl-4 rounded-lg bg-bggray text-black font-montserrat text-lg">
            ЗАПИСЬ НА ПРИЕМ
          </h2>
          <section className="flex flex-col text-base mb-4 tablet:mb-8">
            <h3 className="underline underline-offset-[5px] py-2 flex justify-center text-[18px]">
              Доктор {doctor.name}
            </h3>
            <p className="pt-2 pb-2 font-medium">Выберите дату:</p>
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ru">
              <DatePicker
                value={selectedDate}
                onChange={handleDateChange}
                disablePast
              />
            </LocalizationProvider>
            <p className="pt-4 pb-2 font-medium">Выберите время:</p>
            <div className="grid grid-cols-3 gap-4 mt-4">
              {timeSlots.map((slot, index) => {
                const isSlotBooked = doctor.appointments?.some(
                  (appt) =>
                    dayjs(appt.date).isSame(selectedDate, "day") &&
                    dayjs(appt.time, "HH:mm").isSame(slot, "minute")
                );
                const isSelected =
                  selectedTime && selectedTime.isSame(slot, "minute");

                return (
                  <button
                    key={index}
                    onClick={() => handleTimeSelect(slot)}
                    className={`p-2 rounded-lg ${
                      isSlotBooked
                        ? "bg-bgdarkgray text-white cursor-not-allowed"
                        : isSelected
                        ? "bg-maingreen text-white"
                        : "bg-bggray hover:bg-maingreen hover:text-white"
                    }`}
                    disabled={isSlotBooked}
                  >
                    {slot.format("HH:mm")}
                  </button>
                );
              })}
            </div>
            <section className="py-6">
              {selectedTime ? (
                <div className="flex justify-center">
                  <p className=" pb-2 font-medium">
                    Выбранное вами время{" - "}
                    <span className="font-bold">
                      {dayjs(selectedDate).format("D MMMM")}, {"  "}
                    </span>
                    <span className="font-bold">
                      {selectedTime.format("HH:mm")}
                    </span>
                  </p>
                  <p></p>
                </div>
              ) : (
                <p className="flex justify-center font-medium">
                  Дата визита еще не выбрана
                </p>
              )}
            </section>
            <section className="flex flex-col gap-2">
              <h3 className="pb-2 font-medium ">
                Заполните контактные данные:
              </h3>
              <div className="mb-4 ">
                <input
                  required
                  id="name"
                  type="text"
                  placeholder="Ф. И. О."
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="shadow appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <input
                  required
                  id="email"
                  type="text"
                  placeholder="Электронная почта"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="shadow appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <input
                  required
                  id="phone"
                  type="text"
                  placeholder="Телефон"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="shadow appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
            </section>
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
