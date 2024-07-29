import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const DoctorDashboard = () => {
  const { id } = useParams();
  const [doctor, setDoctor] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [schedule, setSchedule] = useState({});

  useEffect(() => {
    // Получение данных доктора
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

    fetchDoctorData();
  }, [id]);

  const handleDataChange = (e) => {
    setDoctor({ ...doctor, [e.target.name]: e.target.value });
  };

  const handleSaveData = async () => {
    try {
      await axios.put(`http://localhost:5000/api/doctors/${id}`, doctor);
      alert("Данные успешно обновлены");
    } catch (error) {
      console.error("Ошибка при обновлении данных:", error);
    }
  };

  return (
    <div className="p-6">
      {doctor ? (
        <>
          <h1 className="text-2xl font-bold mb-4">
            Панель управления доктором {doctor.name}
          </h1>
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
          <button
            onClick={handleSaveData}
            className="bg-maingreen text-white p-2 rounded"
          >
            Сохранить изменения
          </button>

          <h2 className="text-xl font-bold mt-6 mb-4">
            График работы и записи
          </h2>
          <div className="mb-4">
            <label className="block text-sm mb-2">Дни работы:</label>
            <input
              type="text"
              name="days"
              value={schedule.days ? schedule.days.join(", ") : ""}
              onChange={(e) =>
                setSchedule({ ...schedule, days: e.target.value.split(", ") })
              }
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm mb-2">Часы работы:</label>
            <input
              type="text"
              name="hours"
              value={schedule.hours ? schedule.hours.join(" - ") : ""}
              onChange={(e) =>
                setSchedule({ ...schedule, hours: e.target.value.split(" - ") })
              }
              className="w-full p-2 border rounded"
            />
          </div>

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
