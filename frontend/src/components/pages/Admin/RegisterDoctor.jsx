import React, { useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { fetchDoctors } from "../../../store/doctorSlice";
import { Box, TextField, Button, TextareaAutosize } from "@mui/material";

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
  const [education, setEducation] = useState(""); // Новое поле для образования
  const [schedule, setSchedule] = useState(""); // Новое поле для графика работы

  const handleFileChange = (e) => {
    setPhoto(e.target.files[0]);
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
    formData.append("education", education); // Добавление нового поля в formData
    formData.append("schedule", schedule); // Добавление нового поля в formData

    try {
      await axios.post("http://localhost:5000/api/doctors/register", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      dispatch(fetchDoctors());

      setLogin("");
      setPassword("");
      setName("");
      setSpecialty("");
      setEmail("");
      setExperience(0);
      setAbout("");
      setPhoto(null);
      setEducation(""); // Очистка поля после отправки
      setSchedule(""); // Очистка поля после отправки
    } catch (error) {
      console.error("Error registering doctor:", error);
    }
  };

  return (
    <Box
      className="p-6 flex grow flex-col"
      component="form"
      sx={{
        "& .MuiTextField-root": { my: 1, mr: 1, width: "25ch" },
      }}
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <h2 className="flex justify-center w-full  my-2 tablet:mb-4 py-2 pl-4 rounded-lg bg-bggray text-black font-montserrat text-xl">
        Заполните необходимые данные для добавления врача в БД
      </h2>
      <div className="flex flex-col">
        <TextField
          required
          id="login"
          label="Логин:"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
          style={{ width: "50%", minWidth: "350px" }}
        />
        <TextField
          required
          id="password"
          label="Пароль:"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ width: "50%", minWidth: "350px" }}
        />
        <TextField
          required
          id="email"
          label="Email:"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ width: "50%", minWidth: "350px" }}
        />
      </div>
      <div className="pt-4 flex flex-col">
        <TextField
          required
          id="name"
          label="Ф.И.О:"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ width: "50%", minWidth: "350px" }}
          variant="filled"
        />
        <TextField
          required
          id="specialty"
          label="Специальность:"
          value={specialty}
          onChange={(e) => setSpecialty(e.target.value)}
          style={{ width: "50%", minWidth: "350px" }}
          variant="filled"
        />
        <TextField
          id="experience"
          label="Опыт работы:"
          type="number"
          value={experience}
          onChange={(e) => setExperience(e.target.value)}
          style={{ width: "50%", minWidth: "350px" }}
          InputLabelProps={{
            shrink: true,
          }}
          variant="filled"
        />
        <TextField
          id="education"
          label="Образование:"
          value={education}
          onChange={(e) => setEducation(e.target.value)}
          style={{ width: "50%", minWidth: "350px" }}
          variant="filled"
        />
        <TextField
          id="schedule"
          label="График работы:"
          value={schedule}
          onChange={(e) => setSchedule(e.target.value)}
          style={{ width: "50%", minWidth: "350px" }}
          variant="filled"
        />
        <TextareaAutosize
          aria-label="textarea"
          placeholder="О специалисте:"
          value={about}
          onChange={(e) => setAbout(e.target.value)}
          style={{
            width: "80%",
            minHeight: "150px",
            minWidth: "350px",
            marginTop: "1rem",
            padding: "0.5rem",
            border: "1px solid grey",
          }}
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          style={{ marginTop: "1rem" }}
        />
      </div>
      <Button
        type="submit"
        variant="contained"
        color="primary"
        sx={{ marginTop: "1rem" }}
      >
        Добавить врача
      </Button>
    </Box>
  );
};

export default RegisterDoctor;
