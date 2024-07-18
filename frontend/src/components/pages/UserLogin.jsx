import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../store/authSlice";

const LoginPage = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(credentials));
  };

  return (
    <div className="flex grow flex-col justify-center items-center gap-6">
      <h1>Login</h1>
      <form
        className="px-4 py-12 flex flex-col gap-4 justify-center border-2 border-black rounded-lg"
        onSubmit={handleSubmit}
      >
        <input
          className="flex flex-col gap-4 justify-center border-2 border-black rounded-lg"
          type="text"
          name="username"
          value={credentials.username}
          onChange={handleChange}
          placeholder="Username"
        />
        <input
          className="flex flex-col gap-4 justify-center border-2 border-black rounded-lg"
          type="password"
          name="password"
          value={credentials.password}
          onChange={handleChange}
          placeholder="Password"
        />
        <button
          className="flex justify-center border-2 border-black rounded-lg"
          type="submit"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
