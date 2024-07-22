import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const AdminLogin = () => {
  const { isAuthenticated, login } = useAuth();
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();

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
      console.log(
        'sessionStorage.getItem("isAuthenticated") :>> ',
        sessionStorage.getItem("isAuthenticated")
      );
      console.log("isAuthenticated :>> ", isAuthenticated);
      navigate("/dashboard");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="flex grow items-center justify-center border-2">
      <div className="container mx-auto mt-6 grow">
        <h1 className="flex justify-center text-lg">Администратор?</h1>
        <div className="flex justify-center">
          <form className="flex flex-col gap-4 mt-6" onSubmit={handleSubmit}>
            <input
              className="p-2 border-2 rounded border-sky-700"
              type="text"
              name="username"
              value={credentials.username}
              onChange={handleChange}
              placeholder="Логин"
            />
            <input
              className="p-2 border-2 rounded border-sky-700"
              type="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              placeholder="Пароль"
            />
            <button
              className="p-2 border-2 rounded border-sky-700"
              type="submit"
            >
              Войти
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
