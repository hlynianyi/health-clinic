import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Typography } from "@mui/material";
import { useAuth } from "../../../context/AuthContext";

const Dashboard = () => {
  const { isAuthenticated, logout } = useAuth();

  console.log("dashboard.. isAuthenticated :>> ", isAuthenticated);
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem("isAuthenticated");
    logout();
    console.log("after logout - isAuthenticated :>> ", isAuthenticated);
    navigate("/admin");
  };

  return (
    <div className="flex flex-col grow">
      <Typography className="py-6 px-6" variant="h4">
        Панель управления
      </Typography>
      <div className="px-6 flex flex-row justify-between">
        <Button
          variant="contained"
          onClick={() => navigate("/register-doctor")}
        >
          Зарегистрировать врача
        </Button>
        <Button variant="contained" color="secondary" onClick={handleLogout}>
          Выйти
        </Button>
      </div>
    </div>
  );
};

export default Dashboard;
