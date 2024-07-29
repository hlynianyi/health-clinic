import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

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
  const [isPersonalInfoCollapsed, setPersonalInfoCollapsed] = useState(false);
  const [isScheduleCollapsed, setScheduleCollapsed] = useState(false);
  const [photo, setPhoto] = useState(null);

  useEffect(() => {
    fetchDoctorData();
  }, [id]);

  const fetchDoctorData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/doctors/${id}`
      );
      setDoctor(response.data);
      setAppointments(response.data.appointments || []);
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

  return (
    <div className="p-6">
      {doctor ? (
        <>
          <h1 className="text-2xl font-bold mb-4">
            Панель управления доктором {doctor.name}
          </h1>

          <div className="mb-4">
            <button
              onClick={() => setPersonalInfoCollapsed(!isPersonalInfoCollapsed)}
              className="bg-maingreen text-white p-2 rounded mb-4"
            >
              {isPersonalInfoCollapsed ? "Развернуть" : "Свернуть"} Личные
              данные
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
              className="bg-maingreen text-white p-2 rounded mb-4"
            >
              {isScheduleCollapsed ? "Развернуть" : "Свернуть"} График работы и
              записи
            </button>
            {!isScheduleCollapsed && (
              <div className="border p-4 rounded mb-4">
                <div className="mb-4">
                  <label className="block text-sm mb-2">Дни работы:</label>
                  <div className="flex flex-wrap gap-2">
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
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block text-sm mb-2">Часы работы:</label>
                  <div className="flex gap-4">
                    <input
                      type="number"
                      name="startHour"
                      value={schedule.hours ? schedule.hours[0] : ""}
                      onChange={(e) =>
                        setSchedule({
                          ...schedule,
                          hours: [parseInt(e.target.value), schedule.hours[1]],
                        })
                      }
                      className="w-full p-2 border rounded"
                    />
                    <input
                      type="number"
                      name="endHour"
                      value={schedule.hours ? schedule.hours[1] : ""}
                      onChange={(e) =>
                        setSchedule({
                          ...schedule,
                          hours: [schedule.hours[0], parseInt(e.target.value)],
                        })
                      }
                      className="w-full p-2 border rounded"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          <button
            onClick={handleSaveData}
            className="bg-maingreen text-white p-2 rounded mb-6"
          >
            Сохранить изменения
          </button>

          <h2 className="text-xl font-bold mt-6 mb-4">Записи на прием</h2>
          <div>
            {appointments.length > 0 ? (
              appointments.map((appointment, index) => (
                <div key={index} className="mb-4 border-b pb-2">
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
                </div>
              ))
            ) : (
              <p>Записей нет.</p>
            )}
          </div>
        </>
      ) : (
        <p>Загрузка данных...</p>
      )}
    </div>
  );
};

export default DoctorDashboard;
