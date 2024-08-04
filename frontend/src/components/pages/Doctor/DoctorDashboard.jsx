import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import dayjs from "dayjs";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";

const DAYS_OF_WEEK = [
  "Понедельник",
  "Вторник",
  "Среда",
  "Четверг",
  "Пятница",
  "Суббота",
  "Воскресенье",
];

const DoctorDashboard = () => {
  const { id } = useParams();
  const [doctor, setDoctor] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [schedule, setSchedule] = useState({});
  const [isPersonalInfoCollapsed, setPersonalInfoCollapsed] = useState(true);
  const [isScheduleCollapsed, setScheduleCollapsed] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [editAppointment, setEditAppointment] = useState(null);

  useEffect(() => {
    fetchDoctorData();
  }, [id]);

  const fetchDoctorData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/doctors/${id}`
      );
      const currentDate = dayjs();
      const upcomingAppointments = response.data.appointments
        .filter(
          (appointment) =>
            dayjs(currentDate).format("DD.MM.YYYY") <= appointment.date
        )
        .sort((a, b) => {
          const dateA = dayjs(a.date, "DD.MM.YYYY").toDate();
          const dateB = dayjs(b.date, "DD.MM.YYYY").toDate();
          const timeA = dayjs(a.time, "HH:mm").toDate();
          const timeB = dayjs(b.time, "HH:mm").toDate();
          if (dateA < dateB) return -1;
          if (dateA > dateB) return 1;
          if (timeA < timeB) return -1;
          if (timeA > timeB) return 1;
          return 0;
        });

      console.log(upcomingAppointments);

      setDoctor(response.data);
      setAppointments(upcomingAppointments);
      setSchedule(response.data.schedule || {});
    } catch (error) {
      console.error("Ошибка при получении данных доктора:", error);
    }
  };

  const handleDataChange = (e) => {
    setDoctor({ ...doctor, [e.target.name]: e.target.value });
  };

  const handleSaveData = async () => {
    try {
      const formData = new FormData();
      formData.append("name", doctor.name);
      formData.append("email", doctor.email);
      formData.append("specialty", doctor.specialty);
      formData.append("experience", doctor.experience);
      formData.append("about", doctor.about);
      formData.append("education", doctor.education);
      formData.append("schedule", JSON.stringify(schedule));

      if (photo) {
        formData.append("photo", photo);
      }

      await axios.put(`http://localhost:5000/api/doctors/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      fetchDoctorData();
      alert("Данные успешно обновлены");
    } catch (error) {
      console.error("Ошибка при обновлении данных:", error);
    }
  };

  const handleFileChange = (e) => {
    setPhoto(e.target.files[0]);
  };

  const toggleDaySelection = (day) => {
    setSchedule((prevSchedule) => ({
      ...prevSchedule,
      days: prevSchedule.days.includes(day)
        ? prevSchedule.days.filter((d) => d !== day)
        : [...prevSchedule.days, day],
    }));
  };

  const handleEditAppointment = (appointment) => {
    setEditAppointment(appointment);
  };

  const handleDeleteAppointment = async (appointmentId) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/doctors/${id}/appointments/${appointmentId}`
      );
      fetchDoctorData();
      alert("Запись успешно удалена");
    } catch (error) {
      console.error("Ошибка при удалении записи:", error);
    }
  };

  const handleSaveAppointment = async () => {
    try {
      const updatedAppointment = {
        ...editAppointment,
        // date: dayjs(editAppointment.date, "DD.MM.YYYY").format("DD.MM.YYYY"),
      };
      console.log("save:", updatedAppointment);
      await axios.put(
        `http://localhost:5000/api/doctors/${id}/appointments/${editAppointment._id}`,
        updatedAppointment
      );
      setEditAppointment(null);
      fetchDoctorData();
      alert("Запись успешно обновлена");
    } catch (error) {
      console.error("Ошибка при обновлении записи:", error);
    }
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    if (name === "date") {
      const formattedDate = dayjs(value).format("DD.MM.YYYY");
      console.log("name, value :>> ", name, value);
      console.log("frmtd:", formattedDate);
      setEditAppointment({ ...editAppointment, [name]: formattedDate });
    } else {
      setEditAppointment({ ...editAppointment, [name]: value });
    }
  };

  return (
    <div className="p-6">
      {doctor ? (
        <>
          <h1 className="text-2xl font-bold mb-4">
            Панель управления -{" "}
            <span className="font-medium">{doctor.name}</span>
          </h1>

          <div className="mb-4">
            <button
              onClick={() => setPersonalInfoCollapsed(!isPersonalInfoCollapsed)}
              className="bg-mainblue hover:bg-maingreen  text-white p-2 rounded mb-4"
            >
              Личные данные {"  "}
              {isPersonalInfoCollapsed ? (
                <ArrowDropDownIcon />
              ) : (
                <ArrowDropUpIcon />
              )}
            </button>
            {!isPersonalInfoCollapsed && (
              <div className="border p-4 rounded mb-4">
                <div className="mb-4">
                  <label className="block text-sm mb-2">Имя:</label>
                  <input
                    type="text"
                    name="name"
                    value={doctor.name || ""}
                    onChange={handleDataChange}
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm mb-2">Email:</label>
                  <input
                    type="email"
                    name="email"
                    value={doctor.email || ""}
                    onChange={handleDataChange}
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm mb-2">Специальность:</label>
                  <input
                    type="text"
                    name="specialty"
                    value={doctor.specialty || ""}
                    onChange={handleDataChange}
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm mb-2">Опыт:</label>
                  <input
                    type="number"
                    name="experience"
                    value={doctor.experience || ""}
                    onChange={handleDataChange}
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm mb-2">Описание:</label>
                  <textarea
                    name="about"
                    value={doctor.about || ""}
                    onChange={handleDataChange}
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm mb-2">Фото врача:</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                </div>
              </div>
            )}
          </div>

          <div className="mb-4">
            <button
              onClick={() => setScheduleCollapsed(!isScheduleCollapsed)}
              className="bg-mainblue hover:bg-maingreen  text-white p-2 rounded mb-4"
            >
              График работы и записей {"  "}
              {isScheduleCollapsed ? (
                <ArrowDropDownIcon />
              ) : (
                <ArrowDropUpIcon />
              )}
            </button>
            {!isScheduleCollapsed && (
              <div className="border p-4 rounded mb-4">
                <div className="mb-4">
                  <label className="block text-base mb-2">
                    Дни в которые вы работаете:
                  </label>
                  <div className="flex justify-center flex-wrap gap-2 my-2">
                    {DAYS_OF_WEEK.map((day) => (
                      <button
                        key={day}
                        type="button"
                        onClick={() => toggleDaySelection(day)}
                        className={`text-white py-1 px-2 rounded ${
                          schedule.days?.includes(day)
                            ? "bg-mainblue"
                            : "bg-bgdarkgray"
                        }`}
                      >
                        {day}
                      </button>
                    ))}
                    <span className="text-graytext ">
                      *синий цвет отображает активные дни*
                    </span>
                  </div>
                </div>
                <div className="mb-2">
                  <label className="block text-base mb-2">
                    Часы в которые вы работаете:
                  </label>
                  <div className="flex flex-col tablet:flex-row tablet:justify-evenly gap-4">
                    <div className="flex gap-1 items-center">
                      <p className="w-52 font-medium">Начало рабочего дня:</p>
                      <input
                        type="number"
                        name="startHour"
                        value={schedule.hours ? schedule.hours[0] : ""}
                        onChange={(e) =>
                          setSchedule({
                            ...schedule,
                            hours: [
                              parseInt(e.target.value),
                              schedule.hours[1],
                            ],
                          })
                        }
                        className="w-14 p-2 border rounded"
                      />
                      <span>ч.</span>
                    </div>
                    <div className="flex gap-1 items-center">
                      <p className="w-52 font-medium">Конец рабочего дня:</p>
                      <input
                        type="number"
                        name="endHour"
                        value={schedule.hours ? schedule.hours[1] : ""}
                        onChange={(e) =>
                          setSchedule({
                            ...schedule,
                            hours: [
                              schedule.hours[0],
                              parseInt(e.target.value),
                            ],
                          })
                        }
                        className="w-14 p-2 border rounded"
                      />
                      <span>ч.</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-end ">
            <button
              onClick={handleSaveData}
              className="bg-maingreen hover:bg-orange text-white p-2 rounded my-2"
            >
              Сохранить изменения
            </button>
          </div>

          <h2 className="text-xl font-bold mt-6 mb-4">Записи на прием</h2>
          <div>
            {appointments.length > 0 ? (
              appointments.map((appointment, index) => (
                <div
                  key={index}
                  className="mb-4 border-b pb-2 flex flex-col gap-2"
                >
                  <p className="text-sm">
                    <strong>Дата:</strong> {appointment.date}
                  </p>
                  <p className="text-sm">
                    <strong>Время:</strong> {appointment.time}
                  </p>
                  <p className="text-sm">
                    <strong>Пациент:</strong> {appointment.name}
                  </p>
                  <p className="text-sm">
                    <strong>Email:</strong> {appointment.email}
                  </p>
                  <p className="text-sm">
                    <strong>Телефон:</strong> {appointment.phone}
                  </p>
                  <div className="mt-1">
                    <button
                      onClick={() => handleEditAppointment(appointment)}
                      className="bg-mainblue hover:bg-maingreen  text-white p-1 px-3 rounded mr-2"
                    >
                      Редактировать
                    </button>
                    <button
                      onClick={() => handleDeleteAppointment(appointment._id)}
                      className="bg-red hover:bg-bgdarkgray text-white p-1 px-3 rounded"
                    >
                      Удалить
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p>Записей нет.</p>
            )}
          </div>

          {editAppointment && (
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
              <div className="bg-white p-6 rounded shadow-md">
                <h2 className="text-xl font-bold mb-4">Редактировать запись</h2>
                <div className="mb-4">
                  <label className="block text-sm mb-2">Дата:</label>
                  <input
                    type="date"
                    name="date"
                    value={dayjs(editAppointment.date, "DD.MM.YYYY").format(
                      "YYYY-DD-MM"
                    )}
                    onChange={handleEditChange}
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm mb-2">Время:</label>
                  <input
                    type="time"
                    name="time"
                    value={editAppointment.time}
                    onChange={handleEditChange}
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm mb-2">Пациент:</label>
                  <input
                    type="text"
                    name="name"
                    value={editAppointment.name}
                    onChange={handleEditChange}
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm mb-2">Email:</label>
                  <input
                    type="email"
                    name="email"
                    value={editAppointment.email}
                    onChange={handleEditChange}
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm mb-2">Телефон:</label>
                  <input
                    type="text"
                    name="phone"
                    value={editAppointment.phone}
                    onChange={handleEditChange}
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div className="flex justify-between gap-3">
                  <button
                    onClick={() => setEditAppointment(null)}
                    className="w-1/2 bg-red hover:bg-bgdarkgray text-white p-2 rounded"
                  >
                    Отменить
                  </button>
                  <button
                    onClick={handleSaveAppointment}
                    className="w-1/2 hover:bg-orange bg-maingreen text-white p-2 rounded mr-2"
                  >
                    Сохранить
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      ) : (
        <p>Загрузка данных...</p>
      )}
    </div>
  );
};

export default DoctorDashboard;
