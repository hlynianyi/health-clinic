import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

/**
 * todo: календарь с селектмо нужной даты и времени
 * todo: показать карточку врача к которому идет запись
 * todo: определить метод конфирации записи на прием
 * todo: прокидывать айдишник врача в querystring адресной строки для идент. конкретного врача
 *
 * maket /booking :
 * 1. Список врача(аналог /doctors 1. Фио 2.Фото 3.Спек)
 * 2. При клике на врача открывается суб-компонент с выбором даты времени и заполнением данных
 */
const Booking = () => {
  const navigate = useNavigate();
  const doctors = useSelector((state) => state.doctors.doctors);

  return (
    <>
      <h2 className="flex justify-center w-full mb-2 tablet:mb-4 py-2 pl-4 rounded-lg bg-bggray text-black text-lg font-montserrat">
        Записаться на прием онлайн
      </h2>
    </>
  );
};

export default Booking;
