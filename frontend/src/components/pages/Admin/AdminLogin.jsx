import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";

const AdminLogin = () => {
  const { isAuthenticated, login } = useAuth();
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const adminUsername = process.env.REACT_APP_ADMIN_USERNAME;
    const adminPassword = process.env.REACT_APP_ADMIN_PASSWORD;

    if (
      credentials.username === adminUsername &&
      credentials.password === adminPassword
    ) {
      login();
      sessionStorage.setItem("isAuthenticated", "true");
      navigate("/dashboard");
    } else {
      setError("Неверные учетные данные");
    }
  };

  return (
    <div className="flex justify-center items-center my-auto">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-sm">
        <h2 className="text-2xl mb-4">Вход в админ-панель</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm mb-2">Логин:</label>
            <input
              type="text"
              name="username"
              value={credentials.username}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              placeholder="Введите логин"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm mb-2">Пароль:</label>
            <input
              type="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              placeholder="Введите пароль"
            />
          </div>
          {error && <p className="text-red-600 text-base mb-4">{error}</p>}
          <button
            type="submit"
            className="w-full bg-maingreen text-white p-2 rounded"
          >
            Войти
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
