import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const DoctorLogin = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      // Проверка существования логина
      const response = await axios.post(
        "http://localhost:5000/api/doctors/login",
        { login, password }
      );
      if (response.data.success) {
        // Переход на уникальную страницу доктора при успешной аутентификации
        navigate(`/doctor-dashboard/${response.data.doctor._id}`);
      } else {
        setError(
          response.data.message || "Ошибка при входе. Проверьте данные."
        );
      }
    } catch (error) {
      console.error("Ошибка при входе:", error);
      setError("Ошибка при входе. Проверьте данные.");
    }
  };

  return (
    <div className="flex justify-center items-center my-auto">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-sm">
        <h2 className="text-2xl mb-4">Вход в профиль врача</h2>
        <div className="mb-4">
          <label className="block text-sm mb-2">Логин:</label>
          <input
            type="text"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Введите логин"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm mb-2">Пароль:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Введите пароль"
          />
        </div>
        {error && <p className="text-red text-base mb-4">{error}</p>}
        <button
          onClick={handleLogin}
          className="w-full bg-maingreen text-white p-2 rounded"
        >
          Войти
        </button>
      </div>
    </div>
  );
};

export default DoctorLogin;
