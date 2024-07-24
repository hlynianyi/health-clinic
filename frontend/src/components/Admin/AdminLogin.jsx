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
    <>
      <h1 className="mt-4 mb-10 p-2 flex justify-center text-xl rounded-lg bg-bggray">
        Администратор?
      </h1>
      <div className="flex justify-center mt-6">
        <form className="flex flex-col gap-4 mt-6" onSubmit={handleSubmit}>
          <input
            className="p-2 border-2 rounded border-bgdarkgray px-6"
            type="text"
            name="username"
            value={credentials.username}
            onChange={handleChange}
            placeholder="Логин"
          />
          <input
            className="p-2 border-2 rounded border-bgdarkgray px-6"
            type="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            placeholder="Пароль"
          />
          <button
            className="p-2 mt-6 border-2 rounded border-bgdarkgray px-6"
            type="submit"
          >
            Войти
          </button>
        </form>
      </div>
    </>
  );
};

export default AdminLogin;
