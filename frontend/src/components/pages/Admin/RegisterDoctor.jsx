// components/RegisterDoctor.jsx
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Box, Button, TextField, TextareaAutosize } from "@mui/material";
import axios from "axios";
import { fetchDoctors } from "../../../store/doctorSlice";

const DAYS_OF_WEEK = [
  "Понедельник",
  "Вторник",
  "Среда",
  "Четверг",
  "Пятница",
  "Суббота",
  "Воскресенье",
];

const RegisterDoctor = () => {
  const dispatch = useDispatch();
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [email, setEmail] = useState("");
  const [experience, setExperience] = useState(0);
  const [about, setAbout] = useState("");
  const [photo, setPhoto] = useState(null);
  const [education, setEducation] = useState("");
  const [days, setDays] = useState([]);
  const [startHour, setStartHour] = useState(8);
  const [endHour, setEndHour] = useState(16);

  const handleFileChange = (e) => {
    setPhoto(e.target.files[0]);
  };

  const toggleDaySelection = (day) => {
    setDays((prevDays) =>
      prevDays.includes(day)
        ? prevDays.filter((d) => d !== day)
        : [...prevDays, day]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("login", login);
    formData.append("password", password);
    formData.append("name", name);
    formData.append("specialty", specialty);
    formData.append("email", email);
    formData.append("experience", experience);
    formData.append("about", about);
    formData.append("photo", photo);
    formData.append("education", education);
    formData.append(
      "schedule",
      JSON.stringify({ days, hours: [startHour, endHour] })
    );

    try {
      await axios.post("http://localhost:5000/api/doctors/register", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      dispatch(fetchDoctors());
      // Очистка полей после отправки
      setLogin("");
      setPassword("");
      setName("");
      setSpecialty("");
      setEmail("");
      setExperience(0);
      setAbout("");
      setPhoto(null);
      setEducation("");
      setDays([]);
      setStartHour(8);
      setEndHour(16);
    } catch (error) {
      console.error("Error registering doctor:", error);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      noValidate
      autoComplete="off"
      sx={{ p: 2, display: "flex", flexDirection: "column" }}
    >
      <h2 className="flex justify-center w-full my-2 tablet:mb-4 py-2 pl-4 rounded-lg bg-bggray text-black font-montserrat text-xl">
        Заполните необходимые данные для добавления врача в БД
      </h2>
      <span className="font-medium my-1">
        Данные будут использоваться для входа в аккаунт врача:
      </span>
      <TextField
        required
        id="login"
        label="Логин"
        value={login}
        onChange={(e) => setLogin(e.target.value)}
        sx={{ mb: 2 }}
      />
      <TextField
        required
        id="password"
        label="Пароль"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        sx={{ mb: 2 }}
      />
      <TextField
        required
        id="name"
        label="Ф.И.О"
        value={name}
        onChange={(e) => setName(e.target.value)}
        sx={{ mb: 2 }}
      />
      <p className="font-medium my-1">
        При наличии более чем одной квалификации, указывайте через запятую ','
        для корректной работы категорий на странице "Врачи"
        <br />
        Например: гинеколог, окулист, хирург.
      </p>
      <TextField
        required
        id="specialty"
        label="Специальность"
        value={specialty}
        onChange={(e) => setSpecialty(e.target.value)}
        sx={{ mb: 2 }}
      />
      <TextField
        required
        id="email"
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        sx={{ mb: 2 }}
      />
      <TextField
        required
        id="experience"
        label="Опыт работы"
        type="number"
        value={experience}
        onChange={(e) => setExperience(e.target.value)}
        sx={{ mb: 2 }}
      />
      <TextField
        required
        id="education"
        label="Образование"
        value={education}
        onChange={(e) => setEducation(e.target.value)}
        sx={{ mb: 2 }}
      />
      <textarea
        className="w-full p-[10px] mb-4 border-[1px] rounded-lg border-[#0000003B] hover:border-[#1976d2]"
        aria-label="about"
        placeholder="О специалисте"
        value={about}
        onChange={(e) => setAbout(e.target.value)}
      />

      <p className="font-medium my-4">
        От указанных часов работы зависят часы в которые потенциальный пациент
        сможет записаться на прием.
      </p>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-semibold mb-2">
          Дни работы:
        </label>
        <div className="flex flex-wrap gap-2">
          {DAYS_OF_WEEK.map((day) => (
            <button
              key={day}
              type="button"
              onClick={() => toggleDaySelection(day)}
              className={`text-white py-1 px-2 rounded ${
                days.includes(day) ? "bg-mainblue text-white" : "bg-bgdarkgray"
              }`}
            >
              {day}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-semibold mb-2">
          Часы работы:
        </label>
        <div className="flex gap-4">
          <TextField
            required
            id="startHour"
            label="От"
            type="number"
            value={startHour}
            onChange={(e) => setStartHour(parseInt(e.target.value))}
            InputProps={{ inputProps: { min: 0, max: 23 } }}
            sx={{ mb: 2, width: "100px" }}
          />
          <TextField
            required
            id="endHour"
            label="До"
            type="number"
            value={endHour}
            onChange={(e) => setEndHour(parseInt(e.target.value))}
            InputProps={{ inputProps: { min: 0, max: 23 } }}
            sx={{ mb: 2, width: "100px" }}
          />
        </div>
      </div>
      <label className="font-medium">Фото врача:</label>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <Button type="submit" variant="contained" sx={{ mt: 2 }}>
        Добавить врача
      </Button>
    </Box>
  );
};

export default RegisterDoctor;
